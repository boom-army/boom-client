import CloseIcon from "@material-ui/icons/Close";
import React, { useContext, useState, useCallback } from "react";
import { Box } from "@mui/system";
import { IconButton } from "@material-ui/core";
import { PublicKey, Transaction } from "@solana/web3.js";
import { SOSOL_TOKEN_ID } from "../../utils/ids";
import { TWEET } from "../../queries/tweet";
import { TextField, Stack, Button } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { displayError } from "../../utils";
import { interactionInstruction } from "../../utils/boom-web3";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import { useSosolProgram } from "../../hooks";
import { useTipCreatorMutation } from "../../generated/graphql";

interface Props {
  userPubKey:string;
  setShowTip: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  tweetId: string;
}

export const TipInput: React.FC<Props> = ({
  userPubKey,
  setShowTip,
  userId,
  tweetId,
}) => {
  const { theme } = useContext(ThemeContext);
  const [inputError, setInputError] = useState(false);
  const [txValue, setTxValue] = useState(0);

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();
  const { sosolProgram } = useSosolProgram();

  const [tipCreatorMutation] = useTipCreatorMutation({
    refetchQueries: [{ query: TWEET, variables: { id: tweetId } }],
  });

  // TODO: consolodate tx react hook from EmojiTweet and this
  const handleTipAction = useCallback(
    async ({ txAmount }) => {
      const boomTokens = txAmount * 1000000000;
      try {
        if (txAmount * 1 === 0) {
          setInputError(true);
          throw new Error("You need to enter a Custom value");
        }
        if (!anchorWallet?.publicKey) throw new WalletNotConnectedError();
        const sosolMint = new Token(
          connection,
          SOSOL_TOKEN_ID,
          TOKEN_PROGRAM_ID,
          // @ts-ignore
          anchorWallet.publicKey
        );
        const toCreatorAcc = new PublicKey(userPubKey);
        const associatedDestinationTokenAddr =
          await Token.getAssociatedTokenAddress(
            sosolMint.associatedProgramId,
            sosolMint.programId,
            SOSOL_TOKEN_ID,
            toCreatorAcc
          );

        const receiverAccount = await connection.getAccountInfo(
          associatedDestinationTokenAddr
        );

        // TODO: move this out into a method in utils to use across the site
        // Create receiver sosol acc if null
        if (receiverAccount === null) {
          const instructions = [];
          instructions.push(
            Token.createAssociatedTokenAccountInstruction(
              sosolMint.associatedProgramId,
              sosolMint.programId,
              SOSOL_TOKEN_ID,
              associatedDestinationTokenAddr,
              toCreatorAcc,
              anchorWallet.publicKey
            )
          );

          const transaction = new Transaction().add(...instructions);
          transaction.feePayer = anchorWallet.publicKey;
          transaction.recentBlockhash = (
            await connection.getRecentBlockhash()
          ).blockhash;

          const anchorTx = await anchorWallet.signTransaction(transaction);

          const transactionSignature = await connection.sendRawTransaction(
            anchorTx.serialize(),
            { skipPreflight: true }
          );

          await connection.confirmTransaction(transactionSignature);
        }

        const signature = await interactionInstruction(
          connection,
          sosolProgram,
          anchorWallet.publicKey,
          userPubKey.toString(),
          process.env.REACT_APP_CONTENT_HOST as string,
          boomTokens ? boomTokens : 100000000 // 0.1 SSL
        );

        enqueueSnackbar(`Transaction complete: ${signature}`, {
          variant: "success",
        });
        await tipCreatorMutation({
          variables: {
            tipAmount: boomTokens.toString(),
            tweetId,
            userId,
          },
        });
        setShowTip(false);
      } catch (err) {
        console.log(err);
        return displayError(err, enqueueSnackbar);
      }
    },
    [
      anchorWallet,
      connection,
      enqueueSnackbar,
      setShowTip,
      sosolProgram,
      userPubKey,
      tipCreatorMutation,
      tweetId,
      userId,
    ]
  );

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "2em",
        left: "-12em",
        background: theme.background,
        padding: "1em",
        borderRadius: "5px",
        border: `1px solid ${theme.secondaryColor}`,
        minWidth: "400px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            left: "98.5%",
            top: "-55%",
          }}
        >
          <IconButton
            size="small"
            color="secondary"
            onClick={() => {
              setShowTip(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                handleTipAction({ txAmount: 1 });
              }}
            >
              1
            </Button>
          </div>
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                handleTipAction({ txAmount: 3 });
              }}
            >
              3
            </Button>
          </div>
          <TextField
            error={inputError}
            id="outlined-number"
            label="Custom"
            type="number"
            InputLabelProps={{
              shrink: true,
              style: { color: theme.secondaryColor },
            }}
            InputProps={{
              style: { color: theme.secondaryColor },
            }}
            value={txValue}
            size="small"
            onChange={(e) => {
              setInputError(false);
              setTxValue(Number(e.target.value));
            }}
          />
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                handleTipAction({ txAmount: txValue });
              }}
            >
              Tip
            </Button>
          </div>
        </Stack>
      </Box>
    </Box>
  );
};

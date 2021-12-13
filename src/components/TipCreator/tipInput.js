import React, { useContext, useState, useCallback } from "react";
import { Box } from "@mui/system";
import { PublicKey, Transaction } from "@solana/web3.js";
import { SOSOL_TOKEN_ID } from "../../utils/ids";
import { TextField, Stack, Button } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { displayError } from "../../utils";
import { interactionInstruction } from "../../utils/sosol-web3";
import { styled } from "@mui/system";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import { useSosolProgram } from "../../hooks";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const TipInput = ({ userPubKey, setShowTip }) => {
  const { theme } = useContext(ThemeContext);
  const [inputError, setInputError] = useState(false);
  const [txValue, setTxValue] = useState(0);

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();
  const { sosolProgram } = useSosolProgram();

  const handleTipAction = useCallback(
    async ({ txAmount }) => {
      const boomTokens = txAmount * 1000000000;
      try {
        console.log(boomTokens, userPubKey);
        if (txAmount * 1 === 0) {
          setInputError(true);
          throw new Error("You need to enter a Custom value");
        }
        if (!anchorWallet.publicKey) throw new WalletNotConnectedError();
        const sosolMint = new Token(
          connection,
          SOSOL_TOKEN_ID,
          TOKEN_PROGRAM_ID,
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
          new PublicKey(userPubKey),
          new PublicKey(process.env.REACT_APP_CONTENT_HOST),
          boomTokens ? boomTokens : 100000000 // 0.1 SSL
        );

        enqueueSnackbar(`Transaction complete: ${signature}`, {
          variant: "success",
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
      txValue,
      userPubKey,
    ]
  );

  const Wrapper = styled("div")`
    position: absolute;
    bottom: 2em;
    left: -12em;
    background: ${theme.background};
    padding: 1em;
    border-radius: 5px;
    border: 1px solid ${theme.secondaryColor};
    min-width: 400px;
    & .MuiInputLabel-root {
      color: ${theme.secondaryColor};
    }
    & .MuiOutlinedInput-input {
      border-color: ${theme.accentColor};
    }
    & .MuiInputBase-root {
      width: 100%;
    }
  `;
  return (
    <Wrapper>
      <Box>
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
            }}
            value={txValue}
            size="small"
            onChange={(e) => {
              setInputError(false);
              setTxValue(e.target.value);
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
    </Wrapper>
  );
};

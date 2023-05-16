import React, { useContext, useState, useCallback } from "react";
import { Box } from "@mui/system";
import { Link, useTheme } from "@mui/material";
import { PublicKey, Signer, Transaction } from "@solana/web3.js";
import { SOSOL_TOKEN_ID } from "../../utils/ids";
import { TextField, Stack, Button } from "@mui/material";

import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useSnackbar } from "../../contexts/snackbar";
import {
  useTipCreatorMutation,
  TweetDocument,
  FeedDocument,
  GetUserChannelsDocument,
  HeroFeedDocument,
} from "../../generated/graphql";
import { displayError } from "../../utils";
import { interactionInstruction } from "../../utils/boom-web3";

interface Props {
  userPubKey: string;
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
  const theme = useTheme();
  const [inputError, setInputError] = useState(false);
  const [txValue, setTxValue] = useState(1);

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();

  const [tipCreatorMutation] = useTipCreatorMutation({
    refetchQueries: [
      FeedDocument,
      HeroFeedDocument,
      GetUserChannelsDocument,
      {
        query: TweetDocument,
        variables: { id: tweetId },
      },
    ],
  });

  const snackAction = (signature: string) => (
    <Link href={`https://solana.fm/tx/${signature}`} target={"_blank"}>
      {signature.slice(0, 4) + ".." + signature.slice(-4)}
    </Link>
  );

  const handleTipAction = useCallback(
    async ({ txAmount }: { txAmount: number }) => {
      const boomTokens = txAmount * 1000000000;
      try {
        if (txAmount * 1 === 0) {
          setInputError(true);
          throw new Error("You need to enter a Custom value");
        }
        if (
          !anchorWallet?.publicKey ||
          !anchorWallet.signTransaction ||
          !anchorWallet ||
          !wallet.publicKey
        )
          throw Error("Wallet not connected");

        const payer = anchorWallet.publicKey as unknown as Signer;
        const mintPublicKey = new PublicKey(SOSOL_TOKEN_ID);

        const sosolMint = new Token(
          connection,
          mintPublicKey,
          TOKEN_PROGRAM_ID,
          payer
        );
        const toCreatorAcc = new PublicKey(userPubKey);

        const associatedDestinationTokenAddr =
          await Token.getAssociatedTokenAddress(
            sosolMint.associatedProgramId,
            sosolMint.programId,
            SOSOL_TOKEN_ID,
            toCreatorAcc
          );

        const receiverAccount =
          await sosolMint.getOrCreateAssociatedAccountInfo(toCreatorAcc);

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
            await connection.getLatestBlockhash("confirmed")
          ).blockhash;

          const tx = await anchorWallet.signTransaction(transaction);
          await wallet.sendTransaction(tx, connection);
        }

        const signature = await interactionInstruction(
          connection,
          anchorWallet,
          wallet.publicKey,
          userPubKey.toString(),
          import.meta.env.VITE_CONTENT_HOST as string,
          boomTokens
        );

        enqueueSnackbar("Transaction complete", {
          variant: "success",
          action: snackAction(signature),
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
      tipCreatorMutation,
      tweetId,
      userId,
      userPubKey,
      wallet,
    ]
  );

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <TextField
          error={inputError}
          autoFocus={true}
          id="outlined-number"
          label="$BMA amount to tip"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputMode: "numeric",
            // @ts-ignore
            pattern: "[0-9]*",
          }}
          value={txValue}
          size="small"
          onChange={(e) => {
            setInputError(false);
            setTxValue(Number(e.target.value));
          }}
        />
        <Button
          sx={{ background: theme.accentColor }}
          variant="contained"
          onClick={() => {
            handleTipAction({ txAmount: txValue });
          }}
        >
          Tip
        </Button>
      </Stack>
    </Box>
  );
};

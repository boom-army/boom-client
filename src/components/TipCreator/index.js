import React, { useCallback, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { SOSOL_TOKEN_ID } from "../../utils/ids";
import { TipIcon } from "../Icons";
import { TipInput } from "./tipInput";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { displayError } from "../../utils";
import { interactionInstruction } from "../../utils/sosol-web3";
import { styled } from "@mui/system";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import { useSosolProgram } from "../../hooks";

export const TipCreator = ({ tipAmount, userPubKey }) => {
  const [showTip, setShowTip] = useState(true);

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();
  const { sosolProgram } = useSosolProgram();

  const handleTipAction = useCallback(
    async ({txAmount}) => {
      try {
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
          txAmount = 100000000 // 0.1 SSL
        );

        enqueueSnackbar(`Transaction complete: ${signature}`, {
          variant: "success",
        });
      } catch (err) {
        console.log(err);
        return displayError(err, enqueueSnackbar);
      }
    },
    [
      sosolProgram,
      anchorWallet,
      connection,
      userPubKey,
      enqueueSnackbar,
    ]
  );

  const Wrapper = styled("span")`
    color: #657786;
    position: relative;
  `;
  return (
    <Wrapper>
      <TipIcon onClick={handleTipAction} />
      {tipAmount ? tipAmount : null}
      {showTip ? <TipInput /> : null}
    </Wrapper>
  );
};

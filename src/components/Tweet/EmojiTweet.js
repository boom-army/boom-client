import "emoji-mart/css/emoji-mart.css";
import { Emoji } from "emoji-mart";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { MENTIONS } from "../../queries/others";
import { Loader } from "../Loader";
import { PublicKey, Transaction } from "@solana/web3.js";
import { SmilePlusIcon } from "../Icons";
import { TOGGLE_REACTION, TWEET } from "../../queries/tweet";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { displayError } from "../../utils";
import { interactionInstruction } from "../../utils/boom-web3";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useSosolProgram } from "../../hooks";
import { useState, useCallback } from "react";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SOSOL_TOKEN_ID } from "../../utils/ids";
import { styled } from '@mui/material/styles';

const ReactionWrapper = styled('div')(props=>({
  
  display: 'flex',
  marginRight: '4em',

  '.emoji-count': {
    borderRadius: '7px',
    padding: '4px 4px 0',
    marginRight: '8px',
    cursor: 'pointer',
  },

  '.emoji-count.mine':{
    border: `1px solid ${props.theme.tertiaryColor}`,
    background:  props.theme.tertiaryColor2,
  },

  '.emoji-number': {
    fontSize: '14px',
    marginLeft: '2px',
    verticalAlign: 'text-bottom',
    color: props.theme.secondaryColor,
  }
}));

export const EmojiTweet = ({ tweetId, userPubKey, reactions, parentTweetId }) => {
  const { sosolProgram } = useSosolProgram();
  const [emoji, setEmoji] = useState({});

  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const [toggleReactionMutation, { loading }] = useMutation(TOGGLE_REACTION, {
    variables: { id: tweetId, emojiId: emoji?.emojiId, skin: emoji?.skin },
    refetchQueries: [
      { query: MENTIONS },
      { query: TWEET, variables: { id: tweetId }}
    ],
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleReaction = useCallback(
    async ({ emojiId, skin }) => {
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
          100000000 // 0.1 SSL
        );

        setEmoji({ emojiId, skin });
        await toggleReactionMutation();
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
      toggleReactionMutation,
      connection,
      userPubKey,
      enqueueSnackbar,
    ]
  );

  const ReactionList = ({ reactions }) => {
    return reactions
      .filter((i) => i.count === 1 || (i.count > 1 && i.isMine))
      .sort((a, b) => a.emojiId.localeCompare(b.emojiId))
      .map(({ id, emojiId, skin, count, isMine }) => {
        return (
          <span
            className={`emoji-count ${isMine ? "mine" : ""}`}
            onClick={() => handleReaction({ emojiId, skin })}
            key={id}
          >
            <Emoji emoji={{ id: emojiId, skin }} size={16} />
            <span className="emoji-number">{count > 0 && count}</span>
          </span>
        );
      });
  };

  if (loading) return <Loader />;

  return (
    <ReactionWrapper>
      {reactions && <ReactionList reactions={reactions} />}

      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }) =>
          handleReaction({ emojiId, skin })
        }
        customIcon={<SmilePlusIcon />}
        dismissOnClick={true}
      />
    </ReactionWrapper>
  );
};

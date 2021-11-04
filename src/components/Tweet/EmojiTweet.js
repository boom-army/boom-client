import React, { useState, useCallback } from "react";
import { Emoji } from "emoji-mart";
import { FEED, MENTIONS } from "../../queries/others";
import { Loader } from "../Loader";
import { PublicKey } from "@solana/web3.js";
import { SmilePlusIcon } from "../Icons";
import { TOGGLE_REACTION } from "../../queries/tweet";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { displayError } from "../../utils";
import { interactionInstruction } from "../../utils/sosol-web3";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useSosolProgram } from "../../hooks";
import { EmojiPicker } from "../Emoji/Picker";
import "emoji-mart/css/emoji-mart.css";

export const EmojiTweet = ({ tweetId, userPubKey, reactions, offset }) => {
  const { sosolProgram } = useSosolProgram();
  const [emoji, setEmoji] = useState({});

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const [toggleReactionMutation, { loading }] = useMutation(TOGGLE_REACTION, {
    variables: { id: tweetId, emojiId: emoji?.emojiId, skin: emoji?.skin },
    refetchQueries: [{ query: FEED, variables: { offset: 0, limit: offset } }, { query: MENTIONS }], // TODO: get dyunamic page length data
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleReaction = useCallback(async ({ emojiId, skin }) => {
    try {
      if (!wallet.publicKey) throw new WalletNotConnectedError();
      const signature = await interactionInstruction(
        connection,
        sosolProgram,
        wallet.publicKey,
        new PublicKey(userPubKey),
        new PublicKey(process.env.REACT_APP_CONTENT_HOST),
        100000000 // 0.1 SSL
      );

      await setEmoji({ emojiId, skin });
      await toggleReactionMutation();
      enqueueSnackbar(`Transaction complete: ${signature}`, { variant: "success" });
    } catch (err) {
      console.log(err);
      return displayError(err, enqueueSnackbar);
    }
  }, [sosolProgram, wallet, toggleReactionMutation, connection, userPubKey, enqueueSnackbar]);

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
    <div>
      {reactions && <ReactionList reactions={reactions} />}

      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }) => handleReaction({ emojiId, skin })}
        customIcon={<SmilePlusIcon />}
        dismissOnClick={true}
      />
    </div>
  );
};

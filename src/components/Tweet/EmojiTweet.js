import "emoji-mart/css/emoji-mart.css";
import styled from "styled-components";
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

const ReactionWrapper = styled.div`
  display: flex;
  margin-right: 4em;

  .emoji-count {
    border-radius: 7px;
    padding: 4px 4px 0;
    margin-right: 8px;
    cursor: pointer;
  }

  .emoji-count.mine {
    border: 1px solid ${(props) => props.theme.tertiaryColor};
    background: ${(props) => props.theme.tertiaryColor2};
  }

  .emoji-number {
    font-size: 14px;
    margin-left: 2px;
    vertical-align: text-bottom;
    color: ${(props) => props.theme.secondaryColor};
  }
`;

export const EmojiTweet = ({ tweetId, reactions }) => {
  const [emoji, setEmoji] = useState({});

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
        setEmoji({ emojiId, skin });
        await toggleReactionMutation();
        enqueueSnackbar(`Emoji added`, {
          variant: "success",
        });
      } catch (err) {
        console.log(err);
        return displayError(err, enqueueSnackbar);
      }
    },
    [toggleReactionMutation]
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

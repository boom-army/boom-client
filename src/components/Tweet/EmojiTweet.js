import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Emoji, Picker } from "emoji-mart";
import { SmilePlusIcon } from "../Icons";
import { TOGGLE_REACTION } from "../../queries/tweet";
import { ThemeContext } from "styled-components";
import { displayError } from "../../utils";
import { toast } from "react-toastify";
import { useMutation } from '@apollo/client';
import { FEED } from "../../queries/others";
import { Loader } from '../Loader';

import "emoji-mart/css/emoji-mart.css";

const Wrapper = styled.div`
  .emoji-mart {
    position: absolute;
  }
  .emoji-mart-preview {
    display: none;
  }
  .emoji-mart-dark {
    border-color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.background};
  }
  .emoji-mart-scroll::-webkit-scrollbar {
    width: 0.25rem;
  }
  .emoji-mart-scroll::-webkit-scrollbar-track {
    background: ${(props) => props.theme.background};
  }
  .emoji-mart-scroll::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.accentColor};
  }
  .emoji-pick {
    margin-left: 8px;
  }
  .emoji-count {
    border-radius: 7px;
    padding: 4px 4px 0;
    margin-right: 4px;
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
  @media screen and (max-width: 430px) {
    .emoji-mart {
      position: fixed;
      bottom: 5em;
    }
  }
`;

export const EmojiTweet = ({ tweetId, reactions }) => {
  const theme = useContext(ThemeContext);
  const [picker, togglePicker] = useState(false);
  const [emoji, setEmoji] = useState({});

  const [toggleReactionMutation, { loading }] = useMutation(TOGGLE_REACTION, {
    variables: { id: tweetId, emojiId: emoji?.emojiId, skin: emoji?.skin },
    refetchQueries: [{ query: FEED }],
  });

  const handleReaction = async ({ emojiId, skin }) => {
    try {
      await setEmoji({ emojiId, skin });
      await toggleReactionMutation();
      toast.success("Reaction updated");
    } catch (err) {
      return displayError(err);
    }
  };

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
    <Wrapper>
      <span>
        {reactions && <ReactionList reactions={reactions} />}
        <span className="emoji-pick" onClick={() => togglePicker(!picker)}>
          <SmilePlusIcon />
        </span>
        {picker && (
          <Picker
            theme={theme.background === "#15202b" ? "dark" : "light"}
            onSelect={(pickedEmoji) => {
              handleReaction({
                emojiId: pickedEmoji.id,
                skin: pickedEmoji.skin,
              });
              togglePicker(!picker);
            }}
          />
        )}
      </span>
    </Wrapper>
  );
};

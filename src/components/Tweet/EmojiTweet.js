import "emoji-mart/css/emoji-mart.css";
import styled from "styled-components";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { SmilePlusIcon } from "../Icons";

const ReactionWrapper = styled.div`
  display: flex;
  margin-right: 4em;
`;

export const EmojiTweet = ({ handleReaction }) => {
  return (
    <ReactionWrapper>

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

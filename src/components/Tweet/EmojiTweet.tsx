import "emoji-mart/css/emoji-mart.css";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { SmilePlusIcon } from "../Icons";
import { styled } from "@mui/material/styles";

const ReactionWrapper = styled("div")({
  display: "flex",
  marginRight: "4em",
});

export const EmojiTweet = ({ handleReaction }: any) => {
  return (
    <ReactionWrapper>
      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }: any) =>
          handleReaction({ emojiId, skin })
        }
        customIcon={<SmilePlusIcon />}
        dismissOnClick={true}
      />
    </ReactionWrapper>
  );
};

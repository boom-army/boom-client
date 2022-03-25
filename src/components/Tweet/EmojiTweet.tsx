import "emoji-mart/css/emoji-mart.css";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { SmilePlusIcon } from "../Icons";

export const EmojiTweet = ({ handleReaction }: any) => {
  return (
    <>
      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }: any) =>
          handleReaction({ emojiId, skin })
        }
        customIcon={<SmilePlusIcon />}
        dismissOnClick={true}
      />
    </>
  );
};

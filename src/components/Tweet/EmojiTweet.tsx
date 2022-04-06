import "emoji-mart/css/emoji-mart.css";
import { EmojiPicker } from "../Emojis/EmojiPicker";

export const EmojiTweet = ({ handleReaction }: any) => {
  return (
    <>
      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }: any) =>
          handleReaction({ emojiId, skin })
        }
        dismissOnClick={true}
      />
    </>
  );
};

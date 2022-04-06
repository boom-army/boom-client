import "emoji-mart/css/emoji-mart.css";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export const EmojiTweet = ({ handleReaction }: any) => {
  return (
    <>
      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }: any) =>
          handleReaction({ emojiId, skin })
        }
        customIcon={<InsertEmoticonIcon />}
        dismissOnClick={true}
      />
    </>
  );
};

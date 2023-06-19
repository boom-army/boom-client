import React from 'react';
import "emoji-mart/css/emoji-mart.css";
import { EmojiPicker } from "../Emojis/EmojiPicker";

export const EmojiMessage: React.FC<any> = ({ handleReaction, handleClose }) => {
  const emojiHandler = ({ id: emojiId, skin }: any) => {
    handleReaction({ emojiId, skin });
    handleClose();
  };

  return (
    <>
      <EmojiPicker
        emojiHandler={emojiHandler}
        label="Add emoji"
        dismissOnClick={true}
      />
    </>
  );
};

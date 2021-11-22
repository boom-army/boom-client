
import { useEffect, useState, useContext } from "react";
import { ReactComponent as NFTIcon } from "../../icons/nft.svg"

export const NFTPicker = () => {
  const [picker, togglePicker] = useState(false);

  const handleDocumentClick = event => {
    let isEmojiClassFound = false;

    event?.path?.forEach(elem => {
      if (elem && elem.classList) {
        const data = elem.classList.value;
        if (data.includes("emoji")) {
          isEmojiClassFound = true;
        }
      }
    });
    if (isEmojiClassFound === false && event.target.id !== "emojis-btn") togglePicker(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, false);
    return () => {
      document.removeEventListener("click", handleDocumentClick, false);
    }
  });

  // const handleEmojiSelect = pickedEmoji => {
  //   emojiHandler(pickedEmoji);
  //   if (dismissOnClick) togglePicker(!picker);
  // };

  return (
    <>
      <span className="nft-pick" onClick={() => togglePicker(!picker)}>
        <NFTIcon />
      </span>

      {/* {picker && (
        <Picker
          button={true}
          sheetSize={64}
          theme={theme.background === "#15202b" ? "dark" : "light"}
          onSelect={handleEmojiSelect}
        />
      )}*/}
    </> 
  );
}

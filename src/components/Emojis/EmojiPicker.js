import { useEffect, useState, useContext } from "react";
import { SmileIcon } from "../Icons";
import { Picker } from "emoji-mart";
import { ThemeContext } from "../../contexts/theme";
import "emoji-mart/css/emoji-mart.css";
import { styled } from "@mui/material/styles";

const PickerWrapper = styled("span")((props) => ({
  ".emoji-mart": {
    position: "absolute",
    zIndex: "1",
  },
  ".emoji-mart-bar.emoji-mart-bar,.emoji-mart-scroll.emoji-mart-scroll": {
    marginRight: "0",
  },
  ".emoji-mart-bar svg,.emoji-mart-bar svg path": {
    fill: props.theme.accentColor,
  },
  ".emoji-mart .emoji-mart-anchor-bar": {
    backgroundColor: `${props.theme.accentColor} !important`,
  },
  ".emoji-mart-preview": {
    display: "none",
  },
  ".emoji-mart-dark": {
    borderColor: props.theme.secondaryColor,
    backgroundColor: props.theme.background,
  },
  ".emoji-mart-category": {
    marginTop: "0.75rem",
  },
  ".emoji-mart-dark .emoji-mart-category-label span": {
    backgroundColor: props.theme.background,
    color: "#fff",
  },
  ".emoji-mart-scroll::WebkitScrollbar": {
    width: "0.25rem",
  },
  ".emoji-mart-scroll::WebkitScrollbarTrack": {
    background: props.theme.background,
  },
  ".emoji-mart-scroll::WebkitScrollbarThumb": {
    background: props.theme.accentColor,
  },
  ".emoji-pick": {
    cursor: "pointer",
  },
  ".emoji-pick:hover svg path": {
    fill: props.theme.accentColor,
  },
  "@media screen and (max-width: 430px)": {
    ".emoji-mart": {
      position: "fixed",
      bottom: "5em",
    },
  },
}));

export const EmojiPicker = ({
  emojiHandler,
  customIcon,
  dismissOnClick,
  props,
}) => {
  const [picker, togglePicker] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleDocumentClick = (event) => {
    let isEmojiClassFound = false;

    event?.path?.forEach((elem) => {
      if (elem && elem.classList) {
        const data = elem.classList.value;
        if (data.includes("emoji")) {
          isEmojiClassFound = true;
        }
      }
    });
    if (isEmojiClassFound === false && event.target.id !== "emojis-btn")
      togglePicker(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, false);
    return () => {
      document.removeEventListener("click", handleDocumentClick, false);
    };
  });

  const handleEmojiSelect = (pickedEmoji) => {
    emojiHandler(pickedEmoji);
    if (dismissOnClick) togglePicker(!picker);
  };

  return (
    <PickerWrapper>
      <span className="emoji-pick" onClick={() => togglePicker(!picker)}>
        {customIcon ?? <SmileIcon />}
      </span>

      {picker && (
        <Picker
          button={true}
          sheetSize={64}
          theme={theme.background === "#15202b" ? "dark" : "light"}
          onSelect={handleEmojiSelect}
        />
      )}
    </PickerWrapper>
  );
};

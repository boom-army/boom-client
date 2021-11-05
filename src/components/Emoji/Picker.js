
import { useEffect, useState, useContext } from "react";
import { SmileIcon } from "../Icons";
import { Picker } from "emoji-mart";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import "emoji-mart/css/emoji-mart.css";

const PickerWrapper = styled.span`
  .emoji-mart {
    position: absolute;
    z-index: 1;
  }
  .emoji-mart-bar.emoji-mart-bar,
  .emoji-mart-scroll.emoji-mart-scroll {
    margin-right: 0;
  }
  .emoji-mart-bar svg,
  .emoji-mart-bar svg path {
    fill: ${(props) => props.theme.accentColor}
  }
  .emoji-mart .emoji-mart-anchor-bar {
    background-color: ${(props) => props.theme.accentColor}!important;
  }
  .emoji-mart-preview {
    display: none;
  }
  .emoji-mart-dark {
    border-color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.background};
  }
  .emoji-mart-category {
    margin-top: 0.75rem;
  }
  .emoji-mart-dark .emoji-mart-category-label span {
    background-color: ${(props) => props.theme.background};
    color: #fff;
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
    cursor: pointer;
  }
  .emoji-pick:hover svg path {
    fill: ${(props) => props.theme.accentColor};
  }
  @media screen and (max-width: 430px) {
    .emoji-mart {
      position: fixed;
      bottom: 5em;
    }
  }
`;

export const EmojiPicker = ({ emojiHandler, customIcon, dismissOnClick }) => {
  const [picker, togglePicker] = useState(false);
  const theme = useContext(ThemeContext);

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

  const handleEmojiSelect = pickedEmoji => {
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
}

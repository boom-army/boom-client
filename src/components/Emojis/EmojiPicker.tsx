import { useState, useContext } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Picker } from "emoji-mart";
import { useTheme } from '@mui/material/styles';
import "emoji-mart/css/emoji-mart.css";
import { styled } from "@mui/material/styles";
import { Box, Modal } from "@mui/material";

const PickerWrapper = styled(Box)((props: any) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  ".emoji-mart-bar svg,.emoji-mart-bar svg path": {
    fill: props.theme.palette.primary.main,
  },
  ".emoji-mart .emoji-mart-anchor-bar": {
    backgroundColor: `${props.theme.palette.primary.main} !important`,
  },
  ".emoji-mart-preview": {
    display: "none",
  },
  ".emoji-mart-dark": {
    borderColor: props.theme.palette.secondary.main,
    backgroundColor: props.theme.palette.background.default,
  },
  ".emoji-mart-dark .emoji-mart-category-label span": {
    backgroundColor: props.theme.palette.background.default,
    color: "#fff",
  },
  ".emoji-mart-scroll::WebkitScrollbar": {
    width: "0.25rem",
  },
  ".emoji-mart-scroll::WebkitScrollbarTrack": {
    background: props.theme.palette.background.default,
  },
  ".emoji-mart-scroll::WebkitScrollbarThumb": {
    background: props.theme.palette.primary.main,
  },
}));

const PickerIcon = styled("span")((props: any) => ({
  cursor: "pointer",
  "& svg path": {
    fill: props.theme.palette.secondary.main,
  },
  "&:hover svg path": {
    fill: props.theme.palette.primary.main,
  },
}));

interface EmojiPickerProps {
  emojiHandler?: any;
  customIcon?: any;
  dismissOnClick?: any;
  props?: any;
}

export const EmojiPicker = ({
  emojiHandler,
  customIcon,
  dismissOnClick,
}: EmojiPickerProps) => {
  const [picker, togglePicker] = useState(false);
  const theme = useTheme();

  const handleEmojiSelect = (pickedEmoji: any) => {
    emojiHandler(pickedEmoji);
    if (dismissOnClick) togglePicker(false);
  };

  return (
    <Box>
      <PickerIcon onClick={() => togglePicker(true)}>
        {customIcon ?? <InsertEmoticonIcon />}
      </PickerIcon>
      <Modal
        open={picker}
        onClose={() => togglePicker(false)}
        aria-labelledby="Emoji picker"
        aria-describedby="Pick an emoji for tweet"
      >
        {/* here change `button` to `useButton` bcz we need to add button props in node modules picker file*/}
        <PickerWrapper>
          {picker && (
            // @ts-ignore
            <Picker
              useButton={true}
              sheetSize={64}
              theme={theme.palette.background.default === "#15202b" ? "dark" : "light"}
              onSelect={handleEmojiSelect}
            />
          )}
        </PickerWrapper>
      </Modal>
    </Box>
  );
};

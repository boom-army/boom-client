import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { ReactComponent as BMAIcon } from "../../icons/bma.svg";
import { ThemeContext } from "../../contexts/theme";
import { TipInput } from "./tipInput";
import { styled } from "@mui/material/styles";

const BMAIconWrapper = styled("span")((props) => ({
  svg: {
    color: props.theme.secondaryColor,
  },
}));

interface TipProps {
  tipAmount?: number | null | string;
  userPubKey: any;
  userId: any;
  tweetId: string;
  hideAmount?: boolean;
}

export const TipCreator: React.FC<TipProps> = ({
  tipAmount,
  userPubKey,
  tweetId,
  userId,
  hideAmount,
}) => {
  const { theme } = useContext(ThemeContext);
  const [showTip, setShowTip] = useState(false);

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          sx={{ p: 0 }}
          aria-label="tip"
          onClick={() => setShowTip(!showTip)}
        >
          <BMAIconWrapper>
            <BMAIcon className={"bma-icon"} />
          </BMAIconWrapper>
          {!hideAmount && (
            <Typography ml={0.5} sx={{ color: theme.secondaryColor }}>
              {tipAmount ? tipAmount : null}
            </Typography>
          )}
        </IconButton>
      </Box>
      <Dialog
        open={showTip}
        onClose={() => setShowTip(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Tip this meep some BMA
          <IconButton
            aria-label="close"
            onClick={() => setShowTip(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant={"body2"} sx={{ mb: 2 }}>
            Share the love and show your appreciation by tipping this meeper ❤️❤️❤️
          </Typography>
          <Typography variant={"body2"} sx={{ mb: 2 }}>
            Don't have any $BMA?
            <Link href={"https://jup.ag/swap/SOL-BMA"} target={"_blank"} sx={{ ml: 1 }}>You can get some here</Link>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TipInput
            userPubKey={userPubKey}
            setShowTip={setShowTip}
            userId={userId}
            tweetId={tweetId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

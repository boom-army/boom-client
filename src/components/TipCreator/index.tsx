import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext } from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { TipInput } from "./tipInput";
import { BMAIcon } from "../Icons";

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
  const theme = useTheme();
  const [showTip, setShowTip] = useState(false);

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
          aria-label="tip"
          onClick={() => setShowTip(!showTip)}
        >
          <BMAIcon />
          {!hideAmount && (
            <Typography ml={0.5} color="secondary">
              {tipAmount ? tipAmount : null}
            </Typography>
          )}
        </IconButton>
      </Box>
      <Modal
        open={showTip}
        onClose={() => setShowTip(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            maxWidth: "sm",
            backgroundColor: theme.background,
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2" id="modal-title">
              Tip this meep some BMA
            </Typography>
            <IconButton aria-label="close" onClick={() => setShowTip(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" id="modal-description" sx={{ mb: 2 }}>
              Share the love and show your appreciation by tipping this meeper
              ❤️❤️❤️
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Don't have any $BMA?
              <Link
                href="https://jup.ag/swap/SOL-BMA"
                target="_blank"
                sx={{ ml: 1 }}
              >
                You can get some here
              </Link>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TipInput
              userPubKey={userPubKey}
              setShowTip={setShowTip}
              userId={userId}
              tweetId={tweetId}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

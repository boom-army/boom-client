import React, { useState, useContext } from "react";
import { TipInput } from "./tipInput";
import { ThemeContext } from "../../contexts/theme";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";

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
          <PaidIcon />
          {!hideAmount && (
            <Typography ml={0.5} sx={{ color: theme.secondaryColor }}>
              {tipAmount ? tipAmount : null}
            </Typography>
          )}
        </IconButton>
      </Box>
      <Modal
        open={showTip}
        onClose={() => setShowTip(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.background2,
            p: 1,
          }}
        >
          <TipInput
            userPubKey={userPubKey}
            setShowTip={setShowTip}
            userId={userId}
            tweetId={tweetId}
          />
        </Box>
      </Modal>
    </>
  );
};

import React, { useState, useContext } from "react";
import { TipIcon } from "../Icons";
import { TipInput } from "./tipInput";
import { ThemeContext } from "../../contexts/theme";
import { Box, Modal, Stack, Typography } from "@mui/material";

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
      <Stack direction={"row"} spacing={0.5} sx={{ alignItems: "center" }}>
        <TipIcon onClick={() => setShowTip(!showTip)} userPubKey={userPubKey} />
        {!hideAmount && (
          <Box display={"flex"}>
            <Typography
              sx={{ color: theme.secondaryColor, textAlign: "center" }}
            >
              {tipAmount ? tipAmount : null}
            </Typography>
          </Box>
        )}
      </Stack>
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

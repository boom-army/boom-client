import React, { useState, useContext } from "react";
import { TipIcon } from "../Icons";
import { TipInput } from "./tipInput";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "../../contexts/theme";
import { Box, Stack, Typography } from "@mui/material";

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
        {!hideAmount && <Box display={"flex"}>
          <Typography sx={{ color: theme.secondaryColor, textAlign: "center" }}>
            {tipAmount ? tipAmount : null}
          </Typography>
        </Box>}
      </Stack>
      {showTip ? (
        <TipInput
          userPubKey={userPubKey}
          setShowTip={setShowTip}
          userId={userId}
          tweetId={tweetId}
        />
      ) : null}
    </>
  );
};

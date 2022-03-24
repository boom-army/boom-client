import React, { useState, useContext } from "react";
import { TipIcon2 } from "../Icons";
import { TipInput } from "./tipInput";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "../../contexts/theme";
import { Box, Stack, Typography } from "@mui/material";

interface TipProps {
  tipAmount?: number | null | string;
  userPubKey: any;
  userId: any;
  tweetId: string;
}

export const TipCreator: React.FC<TipProps> = ({
  tipAmount,
  userPubKey,
  tweetId,
  userId,
}) => {
  const { theme } = useContext(ThemeContext);
  const [showTip, setShowTip] = useState(false);

  return (
    <>
      <Stack
        direction={"row"}
        spacing={0.5}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <TipIcon2
          onClick={() => setShowTip(!showTip)}
          userPubKey={userPubKey}
        />
        <Typography sx={{ color: theme.secondaryColor }}>
          {tipAmount ? tipAmount : null}
        </Typography>
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

import LoopIcon from "@mui/icons-material/Loop";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import stc from "string-to-color";
import { Box, Typography } from "@mui/material";
import { SearchTweetsQuery } from "../../generated/graphql";

interface NewsProps {
  meep: SearchTweetsQuery["searchTweets"][0];
}
export const NewsItem = ({ meep }: NewsProps) => {
  const [text] = meep.text.split("#");
  return (
    <Box p={1}>
      <Typography
        display="inline"
        mr={1}
        sx={{ color: stc(meep.user?.handle) }}
      >
        {meep.user?.handle} /
      </Typography>
      <Typography display="inline">{text}</Typography>
      <Typography display="inline">
        <Box display="inline-block">
          <SentimentSatisfiedAltIcon /> 3
        </Box>
        <Box display="inline-block">
          <MonetizationOnIcon /> 3
        </Box>
        <Box display="inline-block">
          <ModeCommentIcon /> 3
        </Box>
        <Box display="inline-block">
          <LoopIcon /> 3
        </Box>
      </Typography>
    </Box>
  );
};

import LoopIcon from "@mui/icons-material/Loop";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import stc from "string-to-color";
import { styled, Box, Typography } from "@mui/material";
import { SearchTweetsQuery } from "../../generated/graphql";

const IconBox = styled(Box)((props: any) => ({
  color: props.theme.blue.light,
  marginLeft: "0.5em",
  "& svg": {
    width: "16px",
    verticalAlign: -6
  },
  "& span": {
    color: props.theme.secondaryColor,
  }
}));

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
        <IconBox display="inline-block">
          <SentimentSatisfiedAltIcon /> <span>3</span>
        </IconBox>
        <IconBox display="inline-block">
          <MonetizationOnIcon /> <span>3</span>
        </IconBox>
        <IconBox display="inline-block">
          <ModeCommentIcon /> <span>3</span>
        </IconBox>
        <IconBox display="inline-block">
          <LoopIcon /> <span>3</span>
        </IconBox>
      </Typography>
    </Box>
  );
};

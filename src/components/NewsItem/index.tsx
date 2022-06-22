import LoopIcon from "@mui/icons-material/Loop";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import stc from "string-to-color";
import { styled, Box, Typography } from "@mui/material";
import { SearchTweetsQuery } from "../../generated/graphql";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const IconBox = styled(Box)((props: any) => ({
  color: props.theme.blue.light,
  marginLeft: "0.5em",
  "& svg": {
    width: "16px",
    verticalAlign: -6,
  },
  "& span": {
    color: props.theme.secondaryColor,
  },
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
        {meep.reactions?.length ? (
          <IconBox display="inline-block">
            <SentimentSatisfiedAltIcon /> <span>{meep.reactions?.length}</span>
          </IconBox>
        ) : null}
        {parseInt(meep.tipsCount as string) > 0 && (
          <IconBox display="inline-block">
            <MonetizationOnIcon />{" "}
            <span>{parseInt(meep.tipsCount as string) / LAMPORTS_PER_SOL}</span>
          </IconBox>
        )}
        {meep.commentsCount ? (
          <IconBox display="inline-block">
            <ModeCommentIcon /> <span>{meep.commentsCount}</span>
          </IconBox>
        ) : null}
        {meep.retweetsCount ? (
          <IconBox display="inline-block">
            <LoopIcon /> <span>{meep.retweetsCount}</span>
          </IconBox>
        ) : null}
      </Typography>
    </Box>
  );
};

import LoopIcon from "@mui/icons-material/Loop";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import stc from "string-to-color";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Link as RouterLink } from "react-router-dom";
import { SearchTweetsQuery } from "../../generated/graphql";
import { styled, Box, Typography, Card, CardActionArea } from "@mui/material";
import { RoutePath } from "../../constants";

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

const IconTypography = styled(Typography)((props: any) => ({
  color: props.theme.secondaryColor,
  fontWeight: 300,
}));

const truncString = (text: string, max: number, add: string) => {
  add = add || "...";
  return text.length > max ? `${text.substring(0, max)}${add}` : text;
};

interface NewsProps {
  meep: SearchTweetsQuery["searchTweets"][0];
}

export const NewsItem = ({ meep }: NewsProps) => {
  let [text] = meep.text.split("#news");
  text = truncString(text, 140, "...");
  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        to={`${RoutePath.HANDLE_HASH}/${meep.user?.handle}/${meep.id}`}
      >
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
                <SentimentSatisfiedAltIcon />{" "}
                <IconTypography display="inline">
                  {meep.reactions?.length}
                </IconTypography>
              </IconBox>
            ) : null}
            {parseInt(meep.tipsCount as string) > 0 && (
              <IconBox display="inline-block">
                <MonetizationOnIcon />{" "}
                <IconTypography display="inline">
                  {parseInt(meep.tipsCount as string) / LAMPORTS_PER_SOL}
                </IconTypography>
              </IconBox>
            )}
            {meep.commentsCount ? (
              <IconBox display="inline-block">
                <ModeCommentIcon />{" "}
                <IconTypography display="inline">
                  {meep.commentsCount}
                </IconTypography>
              </IconBox>
            ) : null}
            {meep.retweetsCount ? (
              <IconBox display="inline-block">
                <LoopIcon />{" "}
                <IconTypography display="inline">
                  {meep.retweetsCount}
                </IconTypography>
              </IconBox>
            ) : null}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

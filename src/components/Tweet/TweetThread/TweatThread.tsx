import React, { useContext } from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { ShowTweet } from "../index";
import { Link } from "react-router-dom";
import { TweetQuery, Tweet } from "../../../generated/graphql";
import { ThreadReply } from "./ThreadReply";
import { RoutePath } from "../../../constants";
import { truncate } from "lodash";

interface Props {
  tweet: TweetQuery["tweet"];
}

export const TweetThread: React.FC<Props> = ({ tweet }: Props) => {
  const theme = useTheme();
  const masterTweets = tweet.masterTweets || [];
  const slicedTweets = masterTweets?.slice(0, 4);
  const isThreaded = masterTweets.length > 0 ?? false;
  const hiddenTweetsCount =
    slicedTweets?.length && (masterTweets?.length - slicedTweets?.length);

  return (
    <Grid
      item
      pb={1.5}
      sx={{ borderBottom: `1px solid ${theme.tertiaryColor}` }}
    >
      <ShowTweet
        key={tweet.id}
        tweet={tweet as Tweet}
        threaded={isThreaded}
        popUpResponse
      />
      {slicedTweets?.length
        ? slicedTweets.map(
            (tweet, i) =>
              tweet && (
                <Grid item xs={12} key={tweet.id} sx={{ position: "relative" }}>
                  {tweet?.parentTweet && <ThreadReply tweet={tweet} />}
                  <ShowTweet
                    key={tweet.id}
                    tweet={tweet as Tweet}
                    threaded={
                      i < 3 && i !== slicedTweets.length - 1 && isThreaded
                    }
                    popUpResponse
                  />
                </Grid>
              )
          )
        : null}
      {tweet.user && hiddenTweetsCount ? (
        <Grid item xs={12}>
          <Box mx={2} mt={1} pl={7}>
            <Link
              style={{ cursor: "pointer", color: theme.accentColor }}
              to={`/${RoutePath.MEEP_HASH}/${tweet?.masterTweet?.id ?? tweet.id}`}
            >
              <Typography variant="body2">
                {hiddenTweetsCount} more meep
                {hiddenTweetsCount > 1 ? "s" : null}...
              </Typography>
            </Link>
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
};

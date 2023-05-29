import React, { useContext } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { ShowTweet } from "../index";
import { Link } from "react-router-dom";
import { TweetQuery, Tweet } from "../../../generated/graphql";
import { RoutePath } from "../../../constants";

interface Props {
  tweet: TweetQuery["tweet"];
}

export const TweetThreadTwoLevel: React.FC<Props> = ({ tweet }: Props) => {
  const theme = useTheme();
  // fix with childtweets if relevant
  const childTweets = tweet.masterTweets;
  // slice array to 3 tweets
  const slicedChildTweets = childTweets?.slice(0, 3);
  const isThreaded =
    (slicedChildTweets && slicedChildTweets.length > 0) ?? false;
  const hiddenTweetsCount =
    childTweets?.length &&
    slicedChildTweets?.length &&
    childTweets?.length - slicedChildTweets?.length;

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
      {slicedChildTweets?.length
        ? slicedChildTweets.map(
            (tweet, i) =>
              tweet && (
                <Grid item xs={12} key={tweet.id}>
                  <ShowTweet
                    key={tweet.id}
                    tweet={tweet as Tweet}
                    threaded={
                      i < 3 && i !== slicedChildTweets.length - 1 && isThreaded
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
              to={`/${RoutePath.MEEP_HASH}/${tweet.id}`}
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

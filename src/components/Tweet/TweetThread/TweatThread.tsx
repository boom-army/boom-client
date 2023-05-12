import React, { useContext } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { ShowTweet } from "../index";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/theme";
import { TweetQuery, Tweet } from "../../../generated/graphql";
import { ReplyBox } from "../../Message/ShowMessage";
import { HashLink } from "react-router-hash-link";
import { UserAvatar } from "../../UserAvatar";
import { ThreadReply } from "./ThreadReply";
import { RoutePath } from "../../../constants";

interface Props {
  tweet: TweetQuery["tweet"];
}

export const TweetThread: React.FC<Props> = ({ tweet }: Props) => {
  const { theme } = useContext(ThemeContext);
  const masterTweets = tweet.masterTweets || [];
  const slicedTweets = masterTweets?.slice(1, 5);
  const isThreaded = (slicedTweets && slicedTweets.length > 0) ?? false;
  const hiddenTweetsCount =
    slicedTweets?.length &&
    slicedTweets?.length &&
    masterTweets?.length - slicedTweets?.length;

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
                  {tweet?.parentTweet && (
                    <ThreadReply tweet={tweet?.parentTweet} />
                  )}
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
              to={`${RoutePath.HANDLE_HASH}/${tweet.user.handle}/${tweet.id}`}
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

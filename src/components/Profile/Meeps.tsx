import React from "react";
import { Box, Typography } from "@mui/material";
import { ShowTweet } from "../Tweet";
import { Tweet, ProfileQuery } from "../../generated/graphql";

export const Meeps: React.FC<{
  data: ProfileQuery | undefined;
}> = ({ data }) => {
  return (
    <>
      {data && data.profile && data.profile.tweets && data.profile.tweets.length
        ? data.profile.tweets.map((tweet) => (
            <ShowTweet
              key={tweet.id}
              tweet={tweet as Tweet}
              offset={10}
              parentTweetId=""
            />
          ))
        : (
          <Box pt={10} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>You haven't Meeped yet</Typography>
          </Box>
        )}
    </>
  );
};

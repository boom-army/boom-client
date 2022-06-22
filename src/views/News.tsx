import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import stc from "string-to-color";
import { useSearchTweetsQuery } from "../generated/graphql";

export const News = () => {
  const { data, loading, fetchMore } = useSearchTweetsQuery({
    variables: { term: "#news", type: "TAGS", limit: 50 },
  });

  if (loading)
    return (
      <Box mt={4}>
        <Loader />
      </Box>
    );

  return data?.searchTweets?.length ? (
    <Grid
      container
      id="tweetScroll"
      sx={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={data?.searchTweets?.length}
        next={() =>
          fetchMore({
            variables: {
              offset: data?.searchTweets?.length ?? 0,
            },
          })
        }
        hasMore={true}
        scrollableTarget="tweetScroll"
        loader={
          loading && (
            <Box sx={{ marginTop: "1rem" }}>
              <Loader />
            </Box>
          )
        }
      >
        {data?.searchTweets.map((tweet) => {
          const [text] = tweet.text.split('#')
          return (
            <Box p={1}>
            <Typography display="inline" mr={1} sx={{ color: stc(tweet.user?.handle) }}>{tweet.user?.handle} /</Typography>
            <Typography display="inline">{text}</Typography>
          </Box>
          )
        })}
      </InfiniteScroll>
    </Grid>
  ) : (
    <CustomResponse text="No Meeps found in the news feed" />
  );
};

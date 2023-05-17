import React from "react";
import { CustomResponse } from "../CustomResponse";
import { ShowTweet } from "../Tweet";
import { Loader } from "../Loader";
import { Box, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResultTweets = ({ tweets, loading, fetchMoreTweets }: any) => {
  if (loading) return <Loader />;

  if (tweets === undefined)
    return (
      <CustomResponse text="Use the search bar to find tags, people and meeps" />
    );

  return tweets?.searchTweets?.length ? (
    <Grid
      container
      id="tweetScroll"
      sx={{
        maxHeight: "calc(100vh - 49px)",
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={tweets?.searchTweets?.length}
        next={() =>
          fetchMoreTweets({
            variables: {
              offset: tweets?.searchTweets?.length ?? 0,
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
        {tweets.searchTweets.map((tweet: any) => (
          <ShowTweet key={tweet.id} tweet={tweet} />
        ))}
      </InfiniteScroll>
    </Grid>
  ) : (
    <CustomResponse text="No Meeps found, try a different search" />
  );
};

export default SearchResultTweets;

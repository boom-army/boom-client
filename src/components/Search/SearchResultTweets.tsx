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

  return (
    <Grid
      container
      id="tweetScroll"
      sx={{
        height: "100vh",
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
        {tweets?.searchTweets?.length ? (
          tweets.searchTweets.map((tweet: any) => (
            <ShowTweet key={tweet.id} tweet={tweet} />
          ))
        ) : (
          <CustomResponse text="No Meeps found, try a different search" />
        )}
      </InfiniteScroll>
    </Grid>
  );
};

export default SearchResultTweets;

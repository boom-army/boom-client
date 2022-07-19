import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import { ApolloError } from "@apollo/client";
import { Box } from "@mui/system";
import { CustomResponse } from "./CustomResponse";
import { Grid } from "@mui/material";
import { Loader } from "./Loader";
import { NewTweet, ShowTweet } from "./Tweet";
import { Tweet } from "../generated/graphql";

interface Props {
  loading?: boolean;
  error?: ApolloError | undefined | any;
  data: Array<Tweet> | undefined;
  fetchMore: (props: any) => void;
}

export const FeedList: React.FC<Props> = ({
  loading,
  error,
  data,
  fetchMore,
}) => {
  if (loading)
    return (
      <Box sx={{ marginTop: "1rem" }}>
        <Loader />
      </Box>
    );
  if (error) return <CustomResponse text={error.message} />;

  // logout the user if removed from db
  if (data === undefined) {
    localStorage.clear();
  }

  const fetchData = () => {
    fetchMore({
      variables: {
        offset: data?.length ?? 0,
      },
    });
  };

  return (
    <Grid
      container
      id="scrollBox"
      sx={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      {data?.length && loading ? (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      ) : null}
      <NewTweet />
      {data?.length ? (
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchData}
          hasMore={true}
          scrollableTarget="scrollBox"
          loader={
            loading && (
              <Box sx={{ marginTop: "1rem" }}>
                <Loader />
              </Box>
            )
          }
        >
          {data?.length
            ? data?.map((tweet) => (
                <ShowTweet key={tweet.id} tweet={tweet as Tweet} />
              ))
            : null}
        </InfiniteScroll>
      ) : (
        <Grid item xs={12}>
          <CustomResponse text="No hero's have meeped." />
        </Grid>
      )}
    </Grid>
  );
};

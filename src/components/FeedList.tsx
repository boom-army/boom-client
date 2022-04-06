import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import { ApolloError } from "@apollo/client";
import { Box } from "@mui/system";
import { CustomResponse } from "./CustomResponse";
import { Grid } from "@mui/material";
import { Loader } from "./Loader";
import { ShowTweet } from "./Tweet";
import { Tweet, FeedQuery } from "../generated/graphql";

interface Props {
  loading?: boolean;
  error?: ApolloError | undefined | any;
  data: FeedQuery["feed"] | undefined;
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
    console.log(data?.length);

    fetchMore({
      variables: {
        offset: data?.length ?? 0,
      },
    });
  };

  return (
    <Grid
      id="scrollableDiv"
      sx={{
        height: "80vh",
        overflow: "auto",
      }}
    >
      {data?.length ? (
        data.map((tweet) => <ShowTweet key={tweet.id} tweet={tweet as Tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
      {data?.length && loading && (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      )}
      <InfiniteScroll
        dataLength={data?.length as number}
        next={fetchData}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        loader={
          loading && (
            <Box sx={{ marginTop: "1rem" }}>
              <Loader />
            </Box>
          )
        }
      >
        {data?.length ? (
          data?.map((tweet) => (
            <ShowTweet key={tweet.id} tweet={tweet as Tweet} />
          ))
        ) : (
          <CustomResponse text="No Meeps exist to display in this feed. Let everyone know what's happening." />
        )}
      </InfiniteScroll>
    </Grid>
  );
};

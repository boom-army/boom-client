import React from "react";
import { ApolloError } from "@apollo/client";
import { Box } from "@mui/system";
import { CustomResponse } from "./CustomResponse";
import { FeedQuery, Tweet } from "../generated/graphql";
import { Grid } from "@mui/material";
import { Loader } from "./Loader";
import { RecoilState } from "recoil";
import { ShowMessage } from "./Meep/ShowMessage";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  data: FeedQuery["feed"] | undefined;
  parentTweetState: RecoilState<string>;
  fetchMore: (props: any) => void;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

export const MeepFeed: React.FC<Props> = ({
  loading,
  error,
  data,
  parentTweetState,
  fetchMore,
  scrollRef,
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

  const fetchData = () =>
    fetchMore({
      variables: {
        offset: data?.length ?? 0,
      },
    });

  return (
    <Grid
      id="scrollableDiv"
      sx={{
        height: "80vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={data?.length as number}
        next={fetchData}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        hasMore={true}
        loader={
          <Box sx={{ marginTop: "1rem" }}>
            <Loader />
          </Box>
        }
        scrollableTarget="scrollableDiv"
      >
        {data?.length ? (
          data.map((tweet) => (
            <ShowMessage
              key={tweet.id}
              tweet={tweet as Tweet}
              parentTweetState={parentTweetState}
              scrollRef={scrollRef}
            />
          ))
        ) : (
          <CustomResponse text="No tweets exist to display in this feed. Let everyone know what's happening." />
        )}
      </InfiniteScroll>
    </Grid>
  );
};

import React from "react";
import { ApolloError } from "@apollo/client";
import { Box } from "@mui/system";
import { CustomResponse } from "./CustomResponse";
import { GetChannelByIdQuery, Tweet } from "../generated/graphql";
import { Grid } from "@mui/material";
import { Loader } from "./Loader";
import { RecoilState } from "recoil";
import { ShowMessage } from "./Message/ShowMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import { headerOffset } from "../utils/boom-web3/constants";

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  data: GetChannelByIdQuery["getChannelById"] | undefined;
  parentMeepState: RecoilState<string>;
  fetchMore: (props: any) => void;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

export const MeepFeed: React.FC<Props> = ({
  loading,
  error,
  data,
  parentMeepState,
  fetchMore,
  scrollRef,
}) => {
  if (loading)
    return (
      <Box sx={{ padding: "2rem" }}>
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
        maxHeight: "80%",
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
          loading && (
            <Box sx={{ padding: "1rem" }}>
              <Loader />
            </Box>
          )
        }
        scrollableTarget="scrollableDiv"
      >
        {data?.length ? (
          data.map((tweet) => (
            <ShowMessage
              key={tweet.id}
              tweet={tweet as Tweet}
              parentMeepState={parentMeepState}
              scrollRef={scrollRef}
            />
          ))
        ) : (
          <CustomResponse text="No Meeps exist to display in this feed. Let everyone know it's happening." />
        )}
      </InfiniteScroll>
    </Grid>
  );
};

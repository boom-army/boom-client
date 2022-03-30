import React from "react";
import { ApolloError } from "@apollo/client";
import { Box } from "@mui/system";
import { CustomResponse } from "./CustomResponse";
import { FeedQuery, Tweet } from "../generated/graphql";
import { Grid } from "@mui/material";
import { Loader } from "./Loader";
import { RecoilState } from "recoil";
import { ShowMessage } from "./Meep/ShowMessage";
import { styled } from "@mui/material/styles";

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  data: FeedQuery["feed"] | undefined;
  parentTweetState: RecoilState<string>;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

export const MeepFeed: React.FC<Props> = ({
  loading,
  error,
  data,
  parentTweetState,
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

  return (
    <Grid container p={2}>
      {data?.length ? (
        data
          .map((tweet) => (
            <ShowMessage
              key={tweet.id}
              tweet={tweet as Tweet}
              parentTweetState={parentTweetState}
              scrollRef={scrollRef}
            />
          ))
          .reverse()
      ) : (
        <CustomResponse text="No tweets exist to display in this feed. Let everyone know what's happening." />
      )}
      {data?.length && loading && (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      )}
    </Grid>
  );
};

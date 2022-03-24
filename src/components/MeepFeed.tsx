import React from "react";
import { CustomResponse } from "./CustomResponse";
import { Loader } from "./Loader";
import { ApolloError } from "@apollo/client";
import { FeedQuery, Tweet } from "../generated/graphql";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { ShowMessage } from "./Meep/Message";
import { Grid } from "@mui/material";

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  data: FeedQuery["feed"] | undefined;
}

export const MeepFeed: React.FC<Props> = ({ loading, error, data }) => {
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
    <Grid container component={Box} p={2}>
      {data?.length ? (
        data.map((tweet) => (
          <ShowMessage key={tweet.id} tweet={tweet as Tweet} />
        )).reverse()
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

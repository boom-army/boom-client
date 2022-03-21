import React from "react";
import { CustomResponse } from "./CustomResponse";
import { Loader } from "./Loader";
import { MeepChat } from "./Meep/MeepChat";
import { ApolloError } from "@apollo/client";
import { FeedQuery, Tweet } from "../generated/graphql";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")({
  marginBottom: "7rem",
});

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  data: FeedQuery["feed"] | undefined;
}

export const MeepThread: React.FC<Props> = ({ loading, error, data }) => {
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
    <Wrapper>
      {data?.length ? (
        data.map((tweet) => <MeepChat key={tweet.id} tweet={tweet as Tweet} />)
      ) : (
        <CustomResponse text="No tweets exist to display in this feed. Let everyone know what's happening." />
      )}
      {data?.length && loading && (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      )}
    </Wrapper>
  );
};

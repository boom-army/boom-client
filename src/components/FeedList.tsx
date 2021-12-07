import React from "react";
import CustomResponse from "./CustomResponse";
import styled from "styled-components";
import { Loader } from "./Loader";
import { Tweet } from "./Tweet";
import { ApolloError } from "@apollo/client";
import { FeedQuery } from "../generated/graphql";
import { Box } from "@mui/system";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  data: FeedQuery | undefined;
}

export const FeedList: React.FC<Props> = ({ loading, error, data }) => {
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
      {data?.feed?.length ? (
        data.feed.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            offset={data.feed.length}
            parentTweetId={tweet?.parentTweet?.id}
          />
        ))
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};

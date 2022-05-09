import React from "react";
import { FeedList } from "../components/FeedList";
import { NewTweet } from "../components/Tweet";
import { useFeedQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  const { loading, error, data, fetchMore } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: true,
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      <NewTweet feed={data?.feed} />
      <FeedList loading={loading} error={error} data={data?.feed} fetchMore={fetchMore} />
    </>
  );
};

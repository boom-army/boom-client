import React from "react";
import { FeedList } from "../components/FeedList";
import { useFeedQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  const { loading, error, data, fetchMore } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: true,
    },
  });

  return (
    <>
      <FeedList loading={loading} error={error} data={data} fetchMore={fetchMore} />
    </>
  );
};

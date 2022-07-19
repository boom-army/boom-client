import React from "react";
import { FeedList } from "../components/FeedList";
import { useFeedQuery, Tweet } from "../generated/graphql";

export const Following: React.FC = () => {
  const { loading, error, data, fetchMore } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: false,
    },
  });

  return (
    <>
      <FeedList loading={loading} error={error} data={data?.feed as Array<Tweet>} fetchMore={fetchMore} />
    </>
  );
};

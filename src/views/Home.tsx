import React from "react";
import { FeedList } from "../components/FeedList";
import { useHeroFeedQuery, Tweet } from "../generated/graphql";

export const Home: React.FC = () => {
  const { loading, error, data, fetchMore } = useHeroFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  return (
    <>
      <FeedList loading={loading} error={error} data={data?.heroFeed as Array<Tweet>} fetchMore={fetchMore} />
    </>
  );
};

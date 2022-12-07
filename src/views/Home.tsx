import React from "react";
import { FeedList } from "../components/FeedList";
import {
  useFeedQuery,
  Tweet,
  useNewMeepsCountQuery,
} from "../generated/graphql";

export const Home: React.FC = () => {
  const { loading, error, data, fetchMore, refetch } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: true,
    },
  });

  const { data: newMeepsCount } = useNewMeepsCountQuery({
    variables: {
      date: data?.feed[0].createdAt,
    },
    pollInterval: 60000,
  });

  return (
    <>
      <FeedList
        loading={loading}
        error={error}
        data={data?.feed as Array<Tweet>}
        fetchMore={fetchMore}
        newMeeps={newMeepsCount?.newMeepsCount}
        refetch={refetch}
      />
    </>
  );
};

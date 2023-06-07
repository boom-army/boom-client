import React, { useEffect, useState } from "react";
import { FeedList } from "../components/FeedList";
import {
  useFeedQuery,
  Tweet,
  useNewMeepsCountQuery,
} from "../generated/graphql";
import dayjs from "dayjs";
import { setDate } from "../utils";

export const Feed: React.FC = () => {
  const [lastMeepDate, setLastMeepDate] = useState<string | null>(null);

  const {
    loading,
    error,
    data,
    fetchMore,
    refetch: refetchData,
  } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: true,
    },
  });

  useEffect(() => {
    if (data?.feed[0]?.createdAt) {
      const feedData = data?.feed[0].masterTweets || [data?.feed[0]];
      const timestamps = feedData.map((item) =>
        item?.createdAt ? parseInt(item?.createdAt as string) : Number(dayjs().valueOf())
      );
      const mostRecentTimestamp = Math.max(...timestamps);
      setLastMeepDate(
        dayjs(setDate(mostRecentTimestamp)).add(1, "second").toISOString()
      );
    }
  }, [data]);

  const { data: newMeepsCount, refetch: refetchCount } = useNewMeepsCountQuery({
    variables: {
      date: lastMeepDate,
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
        refetchData={refetchData}
        refetchCount={refetchCount}
        newMeeps={newMeepsCount?.newMeepsCount}
      />
    </>
  );
};

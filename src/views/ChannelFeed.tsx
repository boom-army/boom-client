import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeedList } from "../components/FeedList";
import { NewTweet } from "../components/Tweet";
import { useChannelFeedQuery } from "../generated/graphql";

export const ChannelFeed: React.FC = () => {
  const { channelId } = useParams();

  const { loading, error, data, fetchMore } = useChannelFeedQuery({
    variables: {
      channelId: channelId as string,
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "network-only",
  });

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      fetchMore({
        variables: {
          offset: data?.channelFeed?.length ?? 0,
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <NewTweet feed={data?.channelFeed} channel={channelId} />
      <FeedList loading={loading} error={error} data={data?.channelFeed} />
    </>
  );
};

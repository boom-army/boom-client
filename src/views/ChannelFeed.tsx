import React, { useEffect, useRef } from "react";
import { MeepFeed } from "../components/MeepFeed";
import { NewMessage } from "../components/Meep/NewMessage";
import { atom } from "recoil";
import { useChannelFeedQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";

export const ChannelFeed: React.FC = () => {
  const { channelId } = useParams();
  const scrollRef = useRef<HTMLDivElement>();
  const parentTweetState = atom({
    key: "parentTweetState",
    default: "",
  });

  const { loading, error, data, fetchMore, refetch } = useChannelFeedQuery({
    variables: {
      channelId: channelId as string,
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "network-only",
    pollInterval: 10000,
  });

  useEffect(() => {
    refetch({
      channelId: channelId as string,
      offset: 0,
    });
    scrollRef?.current?.scrollIntoView();
  }, [channelId]);

  return (
    <>
      <MeepFeed
        loading={loading}
        error={error}
        data={data?.channelFeed}
        fetchMore={fetchMore}
        parentTweetState={parentTweetState}
        scrollRef={scrollRef}
      />
      <NewMessage
        feed={data?.channelFeed}
        channel={channelId}
        parentTweetState={parentTweetState}
        scrollRef={scrollRef}
      />
    </>
  );
};

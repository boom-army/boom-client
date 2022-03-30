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

  const { loading, error, data, fetchMore } = useChannelFeedQuery({
    variables: {
      channelId: channelId as string,
      offset: 0,
      limit: 5,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, []);

  const handleScroll = () => {
    // const bottom =
    //   Math.ceil(window.innerHeight + window.scrollY) >=
    //   document.documentElement.scrollHeight;\
    const top = Math.ceil(window.innerHeight + window.scrollY) === window.innerHeight;
    if (top) {
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
      <MeepFeed
        loading={loading}
        error={error}
        data={data?.channelFeed}
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
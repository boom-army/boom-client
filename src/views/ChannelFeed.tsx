import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { NewMessage } from "../components/Meep/NewMessage";
import { MeepFeed } from "../components/MeepFeed";
import { NewTweet } from "../components/Tweet";
import { useChannelFeedQuery } from "../generated/graphql";

export const ChannelFeed: React.FC = () => {
  const { channelId } = useParams();
  const scrollRef = useRef<HTMLDivElement>();

  const { loading, error, data, fetchMore } = useChannelFeedQuery({
    variables: {
      channelId: channelId as string,
      offset: 0,
      limit: 15,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [data]);

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
    <Box>
      <MeepFeed loading={loading} error={error} data={data?.channelFeed} />
      <NewMessage feed={data?.channelFeed} channel={channelId} ref={scrollRef}/>
    </Box>
  );
};

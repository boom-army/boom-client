import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeepFeed } from "../components/MeepFeed";
import { NewMessage } from "../components/Message/NewMessage";
import { atom } from "recoil";
import {
  useAddChannelMutation,
  useGetChannelByIdQuery,
} from "../generated/graphql";
import { ChannelStatus } from "../constants";

export const ChannelAuction: React.FC = () => {
  const [channelId, setChannelId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>();
  const parentTweetState = atom({
    key: "parentTweetState",
    default: "",
  });

  const [addChannelMutation] = useAddChannelMutation();
  const { loading, error, data, fetchMore, refetch } = useGetChannelByIdQuery({
    variables: {
      channelId,
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "network-only",
    pollInterval: 10000,
  });

  useMemo(() => {
    (async () => {
      const variables = {
        mintAuthority: "harkLSUe2Puud2TVQUhHW4vs45mF1YMLU3PThPCuWd8",
        name: "BoomOnes",
        family: "AuctionHouse",
        image: "",
        description:
          "The BoomOnes Auction House. A perfect place to buy and sell your NFTs.",
        status: ChannelStatus.ACTIVE,
        channelParentId: null,
      };
      try {
        const auctionChannel = await addChannelMutation({
          variables,
        });
        setChannelId(auctionChannel.data?.addChannel?.id as string);
      } catch (error) {
        return Promise.resolve();
      }
    })();
  }, []);

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
        data={data?.getChannelById}
        fetchMore={fetchMore}
        parentTweetState={parentTweetState}
        scrollRef={scrollRef}
      />
      <NewMessage
        feed={data?.getChannelById}
        channel={channelId}
        parentTweetState={parentTweetState}
        scrollRef={scrollRef}
      />
    </>
  );
};

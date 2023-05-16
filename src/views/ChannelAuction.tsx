import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { ChannelStatus } from "../constants";
import { CustomResponse } from "../components/CustomResponse";
import { MeepFeed } from "../components/MeepFeed";
import { NewMessage } from "../components/Message/NewMessage";

import { atom } from "recoil";
import {
  useAddChannelMutation,
  useGetChannelByIdQuery,
} from "../generated/graphql";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export const ChannelAuction: React.FC = () => {
  const [channelId, setChannelId] = useState<string>("");
  const anchorWallet = useAnchorWallet();
  const theme = useTheme();
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
        image:
          "https://shdw-drive.genesysgo.net/F71wchw5NCG2f7jZUE6joXLJQUXU1wZdNhSN33Ww7T7K/boom-moon.png",
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
      {!anchorWallet?.publicKey && (
        <Box
          sx={{
            border: `1px solid ${theme.palette.secondary}`,
            backgroundColor: theme.background2,
          }}
        >
          <CustomResponse text={"Connect your Solana wallet to chat."} />
        </Box>
      )}
      {anchorWallet?.publicKey && (
        <NewMessage
          feed={data?.getChannelById}
          channel={channelId}
          parentTweetState={parentTweetState}
          scrollRef={scrollRef}
        />
      )}
    </>
  );
};

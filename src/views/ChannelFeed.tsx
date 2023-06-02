import React, { useEffect, useRef } from "react";
import { MeepFeed } from "../components/MeepFeed";
import { NewMessage } from "../components/Message/NewMessage";
import { atom } from "recoil";
import { useGetChannelByIdQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { userOwnsNFT } from "../utils/nfts";
import { Box } from "@mui/material";
import { headerOffset } from "../utils/boom-web3/constants";

export const ChannelFeed: React.FC = () => {
  const BOOM_CHANNEL_ID = "cl20tx15a3168501mk7k79w0qs";
  const BOOM_COLLECTION_MINT_PUBLIC_KEY =
    "EJqr8VRC3rJaEVDDkcbG9G122ixW1GQ4f6y6vMwaGoco";
  const { channelId } = useParams();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const scrollRef = useRef<HTMLDivElement>();
  const parentMeepState = atom({
    key: "parentMeepState",
    default: "",
  });

  useEffect(() => {
    (async () => {
      if (publicKey)
        console.log(
          "channelId",
          await userOwnsNFT(
            publicKey?.toBase58(),
            BOOM_COLLECTION_MINT_PUBLIC_KEY,
            connection
          )
        );
    })();
  }, [publicKey]);

  const { loading, error, data, fetchMore, refetch } = useGetChannelByIdQuery({
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
    <Box>
      <MeepFeed
        loading={loading}
        error={error}
        data={data?.getChannelById}
        fetchMore={fetchMore}
        parentMeepState={parentMeepState}
        scrollRef={scrollRef}
      />
      <NewMessage
        feed={data?.getChannelById}
        channel={channelId}
        parentMeepState={parentMeepState}
        scrollRef={scrollRef}
      />
    </Box>
  );
};

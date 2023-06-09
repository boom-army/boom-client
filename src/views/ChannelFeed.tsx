import React, { useContext, useEffect, useRef } from "react";
import { MeepFeed } from "../components/MeepFeed";
import { NewMessage } from "../components/Message/NewMessage";
import {
  useGetChannelByIdQuery,
  useTypingSubscription,
  useUpdateTypingStatusMutation,
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useChannelData } from "../hooks/useChannelData";
import { Box, Stack, Typography, debounce, useTheme } from "@mui/material";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { userOwnsNFT } from "../utils/nfts";
import { UserContext } from "../contexts/user";
import { TypingDots } from "../components/TypingDots";

export const ChannelFeed: React.FC = () => {
  const BOOM_CHANNEL_ID = "cl20tx15a3168501mk7k79w0qs";
  const BOOM_COLLECTION_MINT_PUBLIC_KEY =
    "EJqr8VRC3rJaEVDDkcbG9G122ixW1GQ4f6y6vMwaGoco";
  const { channelId } = useParams();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const scrollRef = useRef<HTMLDivElement>();
  const { user } = useContext(UserContext);
  const theme = useTheme();
  useChannelData();

  const [updateTypingStatusMutation] = useUpdateTypingStatusMutation();
  const { data: typingdata } = useTypingSubscription();
  let typingTimeout: any;
  const handleTyping = () => {
    const userId = user?.id;
    if (userId) {
      clearTimeout(typingTimeout);
      updateTypingStatusMutation({ variables: { userId, isTyping: true } });

      // User stopped typing
      // typingTimeout = setTimeout(() => {
      //   updateTypingStatusMutation({ variables: { userId, isTyping: false } });
      // }, 5000);
    }
  };
  const debouncedTypingHandler = debounce(handleTyping, 500);

  useEffect(() => {
    console.log("typingdata", typingdata);
  }, [typingdata]);

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
        scrollRef={scrollRef}
      />
      {typingdata?.typing.length ? (
        <Stack
          p={1}
          sx={{ backgroundColor: theme.blue.darkest }}
          direction="row"
          spacing={0.5}
        >
          {typingdata?.typing.map((user) => (
            <Typography key={user.id} display="inline" variant="body2">
              @{user.handle}
            </Typography>
          ))}
          <Typography display="inline" variant="body2">
            is typing <TypingDots />
          </Typography>
        </Stack>
      ) : null}
      <NewMessage
        channel={channelId}
        scrollRef={scrollRef}
        typingHandler={debouncedTypingHandler}
      />
    </Box>
  );
};

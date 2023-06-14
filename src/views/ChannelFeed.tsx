import React, { useContext, useEffect, useRef, useState } from "react";
import { MeepFeed } from "../components/MeepFeed";
import { NewMessage } from "../components/Message/NewMessage";
import {
  TypingSubscription,
  useGetChannelByIdQuery,
  useTypingSubscription,
  useUpdateTypingStatusMutation,
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useChannelData } from "../hooks/useChannelData";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
  debounce,
  useTheme,
} from "@mui/material";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { userOwnsNFT } from "../utils/nfts";
import { UserContext } from "../contexts/user";
import { TypingDots } from "../components/TypingDots";
import { BOOM_CHANNEL_ID, BOOM_COLLECTION_MINT_PUBLIC_KEY } from "../utils/ids";
import { Twitter } from "@mui/icons-material";
import { CollectionStats } from "../components/Channel/CollectionStats";

function formatUserHandles(users: TypingSubscription["typing"]) {
  if (users?.length === 1) {
    return `@${users[0].user?.handle}`;
  } else {
    const handles = users?.map((user) => `@${user.user?.handle}`);
    const lastHandle = handles?.pop();
    return handles?.join(", ") + " and " + lastHandle;
  }
}

export const ChannelFeed: React.FC = () => {
  const [validNFT, setValidNFT] = useState(false);
  const { channelId } = useParams();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const scrollRef = useRef<HTMLDivElement>();
  const { user } = useContext(UserContext);
  const theme = useTheme();
  useChannelData();

  const [updateTypingStatusMutation] = useUpdateTypingStatusMutation();
  const { data: typingdata } = useTypingSubscription({
    variables: { channelId: BOOM_CHANNEL_ID },
  });
  let typingTimeout: any;
  const handleTyping = () => {
    const userId = user?.id;
    if (userId) {
      clearTimeout(typingTimeout);
      updateTypingStatusMutation({
        variables: { channelId: BOOM_CHANNEL_ID, isTyping: true },
      });

      // User stopped typing
      typingTimeout = setTimeout(() => {
        updateTypingStatusMutation({
          variables: { channelId: BOOM_CHANNEL_ID, isTyping: false },
        });
      }, 10000);
    }
  };
  const debouncedTypingHandler = debounce(handleTyping, 500);

  useEffect(() => {
    (async () => {
      if (publicKey) {
        const ownsNft = await userOwnsNFT(
          publicKey?.toBase58(),
          BOOM_COLLECTION_MINT_PUBLIC_KEY,
          connection
        );
        setValidNFT(ownsNft);
        console.log("ownsNft", ownsNft);
      }
    })();
  }, [publicKey, connection]);

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

  return validNFT ? (
    <Box>
      <MeepFeed
        loading={loading}
        error={error}
        data={data?.getChannelById}
        fetchMore={fetchMore}
        scrollRef={scrollRef}
      />
      <Box sx={{ position: "relative" }}>
        {typingdata?.typing && typingdata?.typing.length ? (
          <Stack
            p={1}
            sx={{
              backgroundColor: theme.blue.darkest,
              position: "absolute",
              top: -36,
              width: "100%",
            }}
            direction="row"
            spacing={0.5}
          >
            <Typography display="inline" variant="body2">
              {formatUserHandles(typingdata.typing)} is typing <TypingDots />
            </Typography>
          </Stack>
        ) : null}
        <NewMessage
          channel={channelId}
          scrollRef={scrollRef}
          typingHandler={debouncedTypingHandler}
        />
      </Box>
    </Box>
  ) : (
    <Box>
      <Typography variant="h2" p={2} textAlign="center">
        Welcome to the Boom Heroes DAO
      </Typography>
      <Box maxWidth="100%" sx={{ position: "relative" }}>
        <img
          src="https://arweave.net/gZSfTkhEe7pbu5Cnp2W9EkO6wk3bVmFYkjIlJBoqy5M?ext=png"
          width="100%"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
          }}
        >
          <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
            <strong>Description:</strong> The #BoomDAODAO is the first Solana
            native social DAO where everything happens on a single site directly
            on-chain.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
            <strong>Goals:</strong> This DAOs primary focus is to design the the
            way forward for Boom DAOs in the Solana ecosystem, and to build a
            community of like-minded individuals who are passionate about the
            future of Solana.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
            <strong>How to join:</strong> Connect your wallet containing a Boom
            Hero and you will be able to access all DAO functionality on this
            page.
          </Typography>
          <CollectionStats />
          <Divider sx={{ pt: "1rem", mb: "1rem" }} />
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Button
              variant="contained"
              href="https://www.tensor.trade/trade/boomheroes"
              target="_blank"
            >
              Get a Boom Hero
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

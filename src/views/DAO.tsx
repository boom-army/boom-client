import React, { useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Fxnction } from "../components/DAOTweets/Fxnction";
import { DAOPromo } from "../components/Advertising/DAOPromo";
import { ChannelStatus, RoutePath } from "../constants";
import { uniqBy, differenceBy, some, get } from "lodash";
import { displayError } from "../utils";
import { useApolloClient } from "@apollo/client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMetaplex } from "../contexts/metaplex";
import { useSnackbar } from "../contexts/snackbar";
import {
  useGetUserChannelsLazyQuery,
  useAddChannelMutation,
  useUnlinkChannelMutation,
} from "../generated/graphql";

export const DAOView: React.FC = () => {
  const theme = useTheme();
  const { connection } = useConnection();
  const metaplex = useMetaplex();
  const client = useApolloClient();
  const { publicKey } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [isBoomer, setIsBoomer] = useState(false);

  const [getUserChannels, { data }] =
    useGetUserChannelsLazyQuery({
      fetchPolicy: "network-only",
    });
  const [addChannelMutation] = useAddChannelMutation();
  const [channelUnlinkMutation] = useUnlinkChannelMutation();

  useEffect(() => {
    const hasKey = some(
      data?.getUserChannels,
      (obj) => get(obj, "key") === "boom-heroes"
    );
    setIsBoomer(hasKey);
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        if (!publicKey) displayError("Wallet not connected", enqueueSnackbar);
        const nftData = publicKey
          ? await metaplex?.nfts().findAllByOwner({
              owner: publicKey,
            })
          : [];

        const formatChannelData =
          nftData?.map(async (data, i) => {
            try {
              const meta: any = await fetch(data.uri).then((response) =>
                response.json()
              );
              return {
                __typename: "Channel" as "Channel",
                // @ts-ignore
                id: data.mintAddress.toBase58() ?? "",
                mintAuthority: data.updateAuthorityAddress.toBase58() ?? "",
                collection: data.collection?.address ?? "",
                name: meta?.collection?.name ?? "",
                family: meta?.collection?.family ?? "",
                status: "active",
                image: meta.image ?? "",
                description: meta.description ?? "",
                verified: null,
                channelParentId: null,
                membersCount: null,
              };
            } catch (error) {
              return Promise.resolve({
                name: "",
                family: "",
                mintAuthority: "",
                description: "",
                image: "",
                status: "",
              });
            }
          }) || [];
        const channelData = await Promise.all(formatChannelData);
        const validChannels = channelData?.filter(
          (channel) => channel?.name || channel?.family
        );
        const uniqueChannels = uniqBy(validChannels, (d) =>
          [d?.mintAuthority, d?.name, d?.family].join()
        );
        const currentChannels = await getUserChannels();
        const channelDiff = differenceBy(
          currentChannels?.data?.getUserChannels || [],
          uniqueChannels,
          (d) => [d?.mintAuthority, d?.name, d?.family].join()
        );
        // Unlink stale NFT channels
        if (channelDiff.length) {
          const unlinkStaleNFTs = channelDiff.map(async (channel) => {
            try {
              await channelUnlinkMutation({
                variables: { channelId: channel.id },
              });
            } catch (error) {
              return Promise.resolve();
            }
          });
          await Promise.all(unlinkStaleNFTs);
        }
        if (uniqueChannels.length) {
          const unlinkStaleNFTs = uniqueChannels.map(async (channel) => {
            try {
              await addChannelMutation({
                variables: {
                  mintAuthority: channel.mintAuthority,
                  name: channel.name,
                  family: channel.family,
                  description: channel.description,
                  image: channel.image,
                  status: ChannelStatus.ACTIVE,
                  channelParentId: null,
                },
              });
            } catch (error) {
              return Promise.resolve();
            }
          });
          await Promise.all(unlinkStaleNFTs);
        }
      } catch (error) {}
    })();
  }, [connection, publicKey, client]);

  return (
    <Grid container justifyContent="center" mt={2} px={2}>
      <Grid item xs={12}>
        <Typography variant="h1" mb={2} textAlign="center">
          DAO Infrastructure is Broken on Solana...
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={4}
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <Box sx={{ height: "100%", maxWidth: "100%" }}>
            <Fxnction />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            <Stack
              direction="column"
              spacing={2}
              mt={2}
              width="100%"
              sx={{
                p: 2,
                my: 2,
                border: `1px solid ${theme.accentColor}`,
                height: "100%", // Set the height to 100% to match the parent's height
              }}
            >
              <Typography variant="h2" py={1}>
                Really? What are the problems?
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ErrorOutlineIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Solana's native Social based DAO solution? Still missing.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Discord DAOs: too often, just a power party.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Power traits splintering into Telegram. Need we say more?
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Forced 3rd party integration with Solana? Yep.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Day-to-day governance: a literal nightmare.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedUserIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Path to the council for users: unclear at best.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ErrorOutlineIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Clear vision and measurable goals? Hardly.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedUserIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Real incentives for user participation? Non-existent.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LockOpenIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    3rd party lock-in? Totally at the mercy of their API.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsActiveIcon
                      sx={{ color: theme.accentColor }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    Notifications? Scattered around like confetti in different
                    view panes.
                  </ListItemText>
                </ListItem>
              </List>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box py={4}>
          <Typography variant="h2" textAlign="center">
            Boom is building a better way
          </Typography>
        </Box>
      </Grid>
      {isBoomer ? (
        <Grid item xs={12} md={4}>
          <DAOPromo
            heading="Jump into #BoomDAODAO"
            body="You've got a Boom Hero NFT and you're part of the alpha crew, with full access and participation in Solana's first native Social DAO infrastructure!"
            buttonText="Go to #BoomDAODAO"
            buttonLink="https://boom.army/d/boom-heroes"
          />
        </Grid>
      ) : (
        <Grid item xs={12} md={4}>
          <DAOPromo
            heading="Become part of #BoomDAODAO"
            body="Become part of the alpha crew, with full access and participation in Solana's first native Social DAO infrastructure by getting a Boom Hero NFT."
            buttonText="Get a Boom Hero"
            buttonLink="https://www.tensor.trade/trade/boomheroes"
            openBlank={true}
          />
        </Grid>
      )}

      <Grid item xs={12} md={4}>
        <DAOPromo
          heading="Get updates in the Feed"
          body="We'll be posting regular updates and progress to the Feed. You'll be able to publicly comment and interact with the Boom team and other Boom Heroes."
          buttonText="Go to the Feed"
          buttonLink={`/${RoutePath.FEED}`}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DAOPromo
          heading="Read the dev diaries"
          body="Dive into our dev journey and read about the nuts and bolts of delivery. Stay up-to-date with the latest news about DAOs through regular blog entries from harkl."
          buttonText="Read the blog"
          buttonLink="https://docs.boom.army/blog/"
          openBlank={true}
        />
      </Grid>
      <Grid item xs={12}>
        <Box py={4}>
          <Typography variant="h2" textAlign="center">
            We're actively looking for Investment Partners
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DAOPromo
          heading="Invest in the Future of DAOs on Solana"
          body="We're actively seeking visionary venture capitalists who believe in the transformative power of Solana. Partner with us and contribute to the development of the first native Social DAO infrastructure on Solana. Bring your experience, passion, and vision to this journey."
          buttonText="DM harkl on Twitter"
          buttonLink="https://twitter.com/harkl_"
          openBlank={true}
        />
      </Grid>
    </Grid>
  );
};

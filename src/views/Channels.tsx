import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ChannelTile } from "../components/Channel/ChannelTile";
import {
  useAddChannelMutation,
  useGetUserChannelsLazyQuery,
  useUnlinkChannelMutation,
} from "../generated/graphql";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { uniqBy, differenceBy } from "lodash";
import { displayError } from "../utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useSnackbar } from "../contexts/snackbar";
import { useApolloClient } from "@apollo/client";
import { ChannelStatus } from "../constants";
import { useUmi } from "../contexts/umi";
import { useMetaplex } from "../contexts/metaplex";

export const Channels: React.FC = () => {
  const { connection } = useConnection();
  const metaplex = useMetaplex();
  const client = useApolloClient();
  const { publicKey } = useWallet();
  const [nftLoading, setNftLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [getUserChannels, { data, loading, error }] =
    useGetUserChannelsLazyQuery({
      fetchPolicy: "network-only",
    });
  const [addChannelMutation] = useAddChannelMutation();
  const [channelUnlinkMutation] = useUnlinkChannelMutation();

  useEffect(() => {
    setNftLoading(true);
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
            console.log(data);
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
        console.log("nftData", JSON.stringify(channelData));
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
        setNftLoading(false);
      } catch (error) {
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [connection, publicKey, client]);

  if (nftLoading || loading)
    return (
      <Box sx={{ marginTop: "1rem" }}>
        <Loader />
      </Box>
    );
  if (error) return <CustomResponse text={error.message} />;

  return (
    <>
      <Box m={1}>
        <Typography variant="h2" sx={{ fontSize: "18px" }} pb={1}>
          Your NFT DAOs
        </Typography>
      </Box>
      {data && data?.getUserChannels?.length ? (
        data?.getUserChannels?.map((d) => (
          <ChannelTile key={d.id} channel={d} />
        ))
      ) : (
        <CustomResponse text="No channels to display" />
      )}
      {nftLoading && (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      )}
    </>
  );
};

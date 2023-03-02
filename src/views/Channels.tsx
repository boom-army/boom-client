import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ChannelTile } from "../components/Channel/ChannelTile";
import {
  useAddChannelMutation,
  useGetChannelsLazyQuery,
  useUnlinkChannelMutation,
} from "../generated/graphql";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { uniqBy, differenceBy } from "lodash";
import { displayError } from "../utils";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { useSnackbar } from "../contexts/snackbar";
import { useApolloClient } from "@apollo/client";
import { ChannelStatus } from "../constants";

export const Channels: React.FC = () => {
  const { connection } = useConnection();
  const client = useApolloClient();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet as AnchorWallet;
  const [nftLoading, setNftLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [getChannels, { data, loading, error }] = useGetChannelsLazyQuery({
    fetchPolicy: "network-only",
  });
  const [addChannelMutation] = useAddChannelMutation();
  const [channelUnlinkMutation] = useUnlinkChannelMutation();

  useEffect(() => {
    setNftLoading(true);
    (async () => {
      try {
        if (!wallet?.publicKey)
          displayError("Wallet not connected", enqueueSnackbar);
        const nftData = wallet?.publicKey
          ? await Metadata.findDataByOwner(
              connection,
              wallet?.publicKey.toString()
            )
          : [];

        const formatChannelData = nftData.map(async (meta, i) => {
          try {
            const metaDataFetch: any = await fetch(meta.data.uri).then((response) =>
              response.json()
            );
            return {
              __typename: "Channel" as "Channel",
              id: meta.mint ?? "",
              mintAuthority: meta.updateAuthority ?? "",
              name: metaDataFetch?.collection?.name ?? "",
              family: metaDataFetch?.collection?.family ?? "",
              image: metaDataFetch?.image ?? "",
              description: metaDataFetch?.description ?? "",
              status: "active",
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
        });
        const channelData = await Promise.all(formatChannelData);
        const validChannels = channelData.filter(
          (channel) => channel?.name || channel?.family
        );
        const uniqueChannels = uniqBy(validChannels, (d) =>
          [d?.mintAuthority, d?.name, d?.family].join()
        );
        const currentChannels = await getChannels();
        const channelDiff = differenceBy(
          currentChannels?.data?.getChannels || [],
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
                }
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
  }, [connection, wallet, client]);

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
          NFT Channels
        </Typography>
      </Box>
      {data && data?.getChannels?.length ? (
        data?.getChannels?.map((d) => <ChannelTile key={d.id} channel={d} />)
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

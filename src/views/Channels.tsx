import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ChannelTile } from "../components/Channel/ChannelTile";
import { ChannelsDocument, useChannelsQuery } from "../generated/graphql";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { concat, uniqBy } from "lodash";
import { displayError } from "../utils";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useApolloClient } from '@apollo/client';
import { useSnackbar } from "notistack";

export const ChannelView: React.FC = () => {
  const { connection } = useConnection();
  const client = useApolloClient();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useChannelsQuery();

  useEffect(() => {
    (async () => {
      try {
        const nftData = wallet?.publicKey
          ? await Metadata.findDataByOwner(
              connection,
              wallet?.publicKey.toString()
            )
          : [];

        const formatChannelData = nftData.map(async (meta, i) => {
          const metaDataFetch = await fetch(meta.data.uri).then((response) =>
            response.json()
          );
          return {
            __typename: "Channel" as "Channel",
            id: meta.mint,
            mintAuthority: meta.updateAuthority,
            name: metaDataFetch?.collection?.name,
            family: metaDataFetch?.collection?.family,
            image: metaDataFetch.image,
            description: metaDataFetch.description,
            status: "new",
            verified: null,
            channelParentId: null,
          };
        });
        // Merge the NFT data and channels cache data and restore it
        // in the Apollo cache
        const channelData = await Promise.all(formatChannelData);
        const validChannels = channelData.filter(channel => channel?.name || channel?.family);
        const mergedChannels = concat(data?.channels, validChannels);
        const uniqueChannels = uniqBy(mergedChannels, d => [d?.mintAuthority, d?.name, d?.family].join());
        if (uniqueChannels[0]) {
          client.writeQuery({
            query: ChannelsDocument,
            data: {
              channels: uniqueChannels,
            },
          });
        }
      } catch (error) {
        console.log(error);
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [connection, wallet, client, data]);

  if (loading)
    return (
      <Box sx={{ marginTop: "1rem" }}>
        <Loader />
      </Box>
    );
  if (error) return <CustomResponse text={error.message} />;

  return (
    <>
      <Box m={1}>
        <Typography variant="h2" sx={{ fontSize: "18px" }}>
          Select channels to display
        </Typography>
      </Box>
      {data && data?.channels?.length ? (
        data?.channels?.map((d) => <ChannelTile key={d.id} channel={d} />)
      ) : (
        <CustomResponse text="No channels to display" />
      )}
    </>
  );
};

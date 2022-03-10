import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ChannelTile } from "../components/Channel/ChannelTile";
import { CustomResponse } from "../components/CustomResponse";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { displayError } from "../utils";
import { uniqBy } from "lodash";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useChannelsQuery } from "../generated/graphql";
import { useSnackbar } from "notistack";

interface channelData {
  id?: string;
  label: string;
  image: string;
  membersCount?: number;
  mintAuthority?: string | undefined;
  verified?: boolean;
  status?: string;
}

export const ChannelView: React.FC = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet;
  const { enqueueSnackbar } = useSnackbar();

  const [channels, setChannels] = useState<channelData[] | null>(null);

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
          const label = metaDataFetch?.collection
            ? `${metaDataFetch?.collection?.family} - ${metaDataFetch?.collection?.name}`
            : metaDataFetch?.name;
          return {
            id: meta.mint,
            label,
            image: metaDataFetch.image,
            mintAuthority: meta.updateAuthority,
          };
        });
        const channelData = await Promise.all(formatChannelData);
        const uniqueChannels = uniqBy(channelData, "label");
        setChannels(uniqueChannels);
      } catch (error) {
        console.log(error);
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [connection, wallet]);


  return (
    <>
      <Box m={1}>
        <Typography variant="h2" sx={{ fontSize: "18px" }}>
          Select channels to display
        </Typography>
      </Box>
      {channels?.length ? (
        channels.map((d) => (
          <ChannelTile nft={d}/>
        ))
      ) : (
        <CustomResponse text="No NFTs in your wallet" />
      )}
    </>
  );
};

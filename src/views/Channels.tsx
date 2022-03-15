import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { ChannelTile } from "../components/Channel/ChannelTile";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { displayError } from "../utils";
import { uniqBy } from "lodash";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { ChannelsQuery, useChannelsQuery } from "../generated/graphql";
import { useSnackbar } from "notistack";

interface channelData {
  id: string;
  mintAuthority: string;
  name: string;
  family: string;
  membersCount?: number;
  description?: String
  image?: String
  channelParentId?: String
  status?: string;
}

export const ChannelView: React.FC = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useChannelsQuery();

  const [channels, setChannels] = useState<channelData[] | null>(null);
  const [fullData, setFullData] = useState<ChannelsQuery["channels"]>();
  console.log('--------', data && data?.channels);

  useMemo(()=>{
    setFullData(data?.channels);
  },[data])

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
            id: meta.mint,
            mintAuthority: meta.updateAuthority,
            name: metaDataFetch?.collection?.name,
            family: metaDataFetch?.collection?.family,
            image: metaDataFetch.image,
            description: metaDataFetch.description,
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
      {fullData?.length ? (
        fullData?.map((d) => <ChannelTile key={d.id} nft={d} />)
      ) : (
        <CustomResponse text="No channels to display" />
      )}
    </>
  );
};

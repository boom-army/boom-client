import React, { useState, useContext, useMemo, useEffect } from "react";
import {
  Metadata,
  MetadataData,
} from "@metaplex-foundation/mpl-token-metadata";
import { useConnection } from "@solana/wallet-adapter-react";
import { Box } from "@mui/system";
import { Link, Stack, Typography } from "@mui/material";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { currentCluster } from "../../utils/utils";
import { ThemeContext } from "../../contexts/theme";
import { useSnackbar } from "notistack";
import { displayError } from "../../utils";
import { Loader } from "../Loader";

interface NFTGalleryProps {
  publicAddress: string;
}

interface NFTTileProps {
  data: MetadataData;
  cluster: string;
}

interface URIData {
  name: string;
  description: string;
  image: string;
}

const NFTTile: React.FC<NFTTileProps> = ({ data, cluster }) => {
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();

  const [uRIData, setURIData] = useState<URIData>();
  const [explorerLink, setExplorerLink] = useState("");

  useMemo(() => {
    (async () => {
      try {
        const response = await fetch(data.data.uri);
        const json = await response.json();
        setURIData(json);
        setExplorerLink(
          `https://explorer.solana.com/address/${data?.mint}?cluster=${cluster}`
        );
      } catch (error) {
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [data, cluster]);

  return (
    <>
      <Box
        pb={4}
        pr={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "140px",
        }}
      >
        <Link
          href={explorerLink}
          target="_blank"
          color={theme.secondaryColor}
          underline="hover"
        >
          <Box>
            {uRIData?.image ? (
              <img src={uRIData?.image} alt={uRIData?.name} width="120" />
            ) : (
              <DoNotDisturbOnIcon fontSize="large" />
            )}
          </Box>
          <Box>
            <Typography sx={{ fontSize: "0.8em", maxWidth: "120px" }}>{uRIData?.name}</Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export const NFTGallery: React.FC<NFTGalleryProps> = ({ publicAddress }) => {
  const { connection } = useConnection();
  const { name } = currentCluster();
  const { enqueueSnackbar } = useSnackbar();

  const [nfts, setNfts] = useState<MetadataData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const nftMeta = await Metadata.findByOwnerV2(connection, publicAddress);
        const nftData = nftMeta.map((meta) => meta.data);
        setNfts(nftData);
      } catch (error) {
        displayError(error, enqueueSnackbar);
      } finally {
        setLoading(false);
      }
    })();
  }, [publicAddress, connection, enqueueSnackbar]);

  if (loading) return <Loader />;

  return (
    <>
      {nfts?.length ? (
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          {nfts &&
            nfts.map((nft: MetadataData) => (
              <NFTTile data={nft} key={nft.mint} cluster={name} />
            ))}
        </Stack>
      ) : (
        <Box pt={10} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No NFTs in your wallet</Typography>
        </Box>
      )}
    </>
  );
};

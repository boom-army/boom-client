import React, { useState, useMemo, useEffect } from "react";
import {
  Metadata,
  MetadataDataData,
} from "@metaplex-foundation/mpl-token-metadata";
import { useConnection } from "@solana/wallet-adapter-react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { currentCluster } from "../../utils/utils";
// import { ThemeContext } from "../../contexts/theme";
import { useSnackbar } from "notistack";
import { displayError } from "../../utils";
import { Loader } from "../Loader";
import { styled } from "@mui/material/styles";
import BasicModal from "../MarketPlaceModal/NFTDialogue";

const Wrapper = styled("div")((props) => ({
  ".nft-token-section": {
    marginBottom: "10px",
  },
  ".nft-gird": {
    position: "relative",
    ".nft-img": {
      width: "130px",
      height: "130px",
    },
    span: {
      display: "inline-block",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      position: "absolute",
      right: "-10px",
      bottom: "0",
      img: {
        borderRadius: "50%",
        border: "5px solid #15202b",
      },
    },
    ".tokenPrice": {
      position: "absolute",
      top: "3px",
      right: "3px",
      backgroundColor: "#35a600",
      fontSize: "11px",
      whiteSpace: "nowrap",
      width: "auto",
      height: "21px",
      borderRadius: "25px",
      padding: "2px 6px",
      textTransform: "uppercase",
    },
  },

  "@media screen and (max-width: 767px)": {
    ".nft-token-section": {
      width: "73px",
    },
    ".nft-gird": {
      ".nft-img": {
        width: "73px",
        height: "73px",
      },
      span: {
        width: "20px",
        height: "20px",
        right: "6px",
        bottom: "15px",
      },
    },
  },
}));
interface NFTGalleryProps {
  publicAddress: string;
}

interface NFTTileProps {
  data: MetadataDataData;
  cluster: string;
}

interface URIData {
  name: string;
  description: string;
  image: string;
}

const NFTTile: React.FC<NFTTileProps> = ({ data, cluster }) => {
  // const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const uRIData = {
    name: "Rene Descartes",
    description: "The New Press",
    symbol: "SOLTYPE",
    image:
      "https://www.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png",
    properties: {
      files: [
        {
          uri: "https://www.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png",
          type: "image/png",
        },
      ],
      category: "image",
      creators: [
        { address: "DpFSXTEGgKWULT4tSAQk51cZrTnDj1LXgYJVDbkE2Koq", share: 100 },
      ],
    },
    seller_fee_basis_points: 500,
    attributes: [{ trait_type: "Author", value: "Rene Descartes" }],
    collection: {},
  };

  // const [uRIData, setURIData] = useState<URIData>();
  // const [explorerLink, setExplorerLink] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleModal = () => {
    setIsClicked(true);
  };

  useMemo(() => {
    (async () => {
      try {
        const response = await fetch(data.uri);
        const json = await response.json();
        // setURIData(json);
        // setExplorerLink(
        //   `https://explorer.solana.com/address/${data?.mint}?cluster=${cluster}`
        // );
      } catch (error) {
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [data, cluster]);

  return (
    <>
      <Box
        pb={3}
        pr={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "auto",
        }}
      >
        {/* <Link
          href={explorerLink}
          target="_blank"
          color={theme.secondaryColor}
          underline="hover"
        > */}

        <Wrapper onClick={handleModal}>
          <div className="nft-token-section">
            <Box>
              <div className="nft-gird">
                {uRIData?.image ? (
                  <img
                    className="nft-img"
                    src={uRIData?.image}
                    alt={uRIData?.name}
                    width="120"
                  />
                ) : (
                  <DoNotDisturbOnIcon fontSize="large" />
                )}

                <span>
                  {uRIData?.image ? (
                    <img
                      src={uRIData?.image}
                      alt={uRIData?.name}
                      width="40"
                      height="40"
                    />
                  ) : (
                    <DoNotDisturbOnIcon fontSize="large" />
                  )}
                </span>

                <span className="tokenPrice">72 SOL</span>
              </div>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.8em", maxWidth: "120px" }}>
                {uRIData?.name}
              </Typography>
            </Box>
          </div>
        </Wrapper>
        {isClicked ? <BasicModal /> : ""}
        {/* </Link> */}
      </Box>
    </>
  );
};

export const NFTGallery: React.FC<NFTGalleryProps> = ({ publicAddress }) => {
  const { connection } = useConnection();
  const { name } = currentCluster();
  const { enqueueSnackbar } = useSnackbar();

  const nfts = [
    {
      name: "Rene Descartes",
      description: "The New Press",
      symbol: "SOLTYPE",
      image:
        "https://www.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png",
      properties: {
        files: [
          {
            uri: "https://www.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png",
            type: "image/png",
          },
        ],
        category: "image",
        creators: [
          {
            address: "DpFSXTEGgKWULT4tSAQk51cZrTnDj1LXgYJVDbkE2Koq",
            share: 100,
          },
        ],
      },
      seller_fee_basis_points: 500,
      attributes: [{ trait_type: "Author", value: "Rene Descartes" }],
      collection: {},
    },
  ];
  // const [nfts, setNfts] = useState<MetadataDataData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // const nftMeta = await Metadata.findByOwnerV2(connection, publicAddress);
        const nftMeta = await Metadata.findDataByOwner(
          connection,
          publicAddress
        );
        const nftData = nftMeta.map((meta) => meta.data);

        // setNfts(nftData);
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
            nfts.map((nft: any) => (
              <NFTTile data={nft} key={nft.uri} cluster={name} />
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

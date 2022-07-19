import Clear from "@mui/icons-material/Clear";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Loader } from "../Loader";
import {
  Metadata,
  MetadataData,
} from "@metaplex-foundation/mpl-token-metadata";
import { ThemeContext } from "../../contexts/theme";
import { currentCluster } from "../../utils/utils";
import { displayError } from "../../utils";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  useEditProfileMutation,
  ProfileDocument,
  ProfileQuery,
} from "../../generated/graphql";
import { useSnackbar } from "../../contexts/snackbar";
import { useParams } from "react-router-dom";

interface NFTTileProps {
  data: MetadataData;
  cluster: string;
}

interface NFTTraits {
  trait_type: string;
  value: string;
}

interface URIData {
  name: string;
  description: string;
  image: string;
  attributes: NFTTraits[];
}

const NFTTile: React.FC<NFTTileProps> = ({ data, cluster }) => {
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  let { handle } = useParams<string>();

  const [nftSelect, toggleNftSelect] = useState(false);
  const [uRIData, setURIData] = useState<URIData>();

  const [editProfileMutation] = useEditProfileMutation({
    refetchQueries: [{ query: ProfileDocument, variables: { handle } }],
  });

  useMemo(() => {
    (async () => {
      try {
        const response = await fetch(data.data.uri);
        const json = await response.json();
        setURIData(json);
      } catch (error) {
        displayError(error, enqueueSnackbar);
      }
    })();
  }, []);

  const handleEditProfile = async (e: any) => {
    e.preventDefault();

    try {
      await editProfileMutation({
        variables: {
          handle,
          avatar: uRIData?.image,
          data: {
            avatarMint: data.mint,
            avatarUpdateAuthority: data.updateAuthority,
          },
        },
      });

      enqueueSnackbar("Your profile has been updated 🥳.", {
        variant: "success",
      });
    } catch (err) {
      return displayError(err, enqueueSnackbar);
    }
  };

  return (
    <>
      <Box
        pb={4}
        pr={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "140px",
          cursor: "pointer",
        }}
        key={uRIData?.image}
      >
        <Link
          onClick={() => toggleNftSelect(true)}
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
            <Typography sx={{ fontSize: "0.8em", maxWidth: "120px" }}>
              {uRIData?.name}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Modal
        open={nftSelect}
        onClose={() => toggleNftSelect(false)}
        aria-labelledby="NFT action select"
        aria-describedby="Apply action for given NFT"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 2,
            bgcolor: theme.background,
            border: `2px solid ${theme.blue.lightest}`,
            borderRadius: 1,
            maxWidth: "25em",
            width: "95%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography id="nft-modal-title" variant="h6" component="h2">
              {uRIData?.name}
            </Typography>
            <IconButton
              aria-label="close-modal"
              onClick={() => toggleNftSelect(false)}
              sx={{
                padding: 0,
              }}
            >
              <Clear fontSize="small" sx={{ color: theme.blue.lighter }} />
            </IconButton>
          </Box>
          <Box display="flex" mt={2}>
            <Stack spacing={2}>
              {uRIData?.image && (
                <img src={uRIData?.image} alt={uRIData?.name} width="120" />
              )}
              {/* Verified */}
            </Stack>
            <Box
              ml={1}
              display="flex"
              sx={{
                overflow: "hidden",
                flexWrap: "wrap",
                alignContent: "flex-start",
              }}
            >
              {uRIData?.attributes && typeof uRIData?.attributes?.map === 'function' &&
                uRIData.attributes.map((nftItem) => (
                  <Chip
                    label={`${nftItem.trait_type}: ${nftItem.value}`}
                    variant="outlined"
                    size="small"
                    sx={{
                      margin: "0 0.5em 0.5em 0",
                      fontSize: "0.7em",
                    }}
                  />
                ))}
              <Chip
                component="a"
                target="_blank"
                href={`https://solana.fm/address/${data?.mint}?cluster=${cluster}-solana`}
                label="View in explorer"
                variant="outlined"
                size="small"
                color="primary"
                sx={{
                  margin: "0 0.5em 0.5em 0",
                  cursor: "pointer",
                  fontSize: "0.7em",
                }}
              />
            </Box>
          </Box>
          <Stack mt={2} spacing={1}>
            <Button
              fullWidth={true}
              variant="contained"
              onClick={handleEditProfile}
            >
              Set Profile Picture
            </Button>
            <Button
              fullWidth={true}
              variant="outlined"
              onClick={() => toggleNftSelect(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export const NFTGallery: React.FC<ProfileQuery> = ({ profile }) => {
  const { connection } = useConnection();
  const { name } = currentCluster();
  const { enqueueSnackbar } = useSnackbar();

  const [nfts, setNfts] = useState<MetadataData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const nftMeta = profile.publicAddress
          ? await Metadata.findDataByOwner(connection, profile.publicAddress)
          : [];
        setNfts(nftMeta);
      } catch (error) {
        displayError(error, enqueueSnackbar);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
              <NFTTile data={nft} key={nft.data.uri} cluster={name} />
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

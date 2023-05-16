import Clear from "@mui/icons-material/Clear";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Link,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FindNftsByOwnerOutput,
  Metadata,
  Nft,
  PublicKey,
  Sft,
} from "@metaplex-foundation/js";
import { Loader } from "../Loader";

import { UserContext } from "../../contexts/user";
import { currentCluster } from "../../utils/utils";
import { displayError } from "../../utils";
import {
  useEditProfileMutation,
  ProfileDocument,
  ProfileQuery,
} from "../../generated/graphql";
import { useMetaplex } from "../../contexts/metaplex";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbar";

interface NFTTileProps {
  data: Metadata | Nft | Sft;
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
  const theme = useTheme();
  const { setUser } = useContext(UserContext);

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
        const response = await fetch(data.uri);
        const json = await response.json();
        setURIData(json);
      } catch (error) {
        console.log(console.error());
      }
    })();
  }, [data, cluster]);

  const handleEditProfile = async (e: any) => {
    e.preventDefault();

    try {
      const { data: profile }: any = await editProfileMutation({
        variables: {
          handle,
          avatar: uRIData?.image,
          data: {
            // @ts-ignore
            avatarMint: data.mintAddress.toBase58(),
            avatarUpdateAuthority: data.updateAuthorityAddress.toBase58(),
          },
        },
      });

      setUser(profile.editProfile);
      toggleNftSelect(false);

      enqueueSnackbar("Your profile has been updated 🥳.", {
        variant: "success",
      });
    } catch (err) {
      return displayError(err, enqueueSnackbar);
    }
  };

  return (
    <>
      <Grid item sm={4} md={3}>
        <Box
          sx={{
            cursor: "pointer",
            width: "100%",
          }}
          key={uRIData?.image}
        >
          <Link
            onClick={() => toggleNftSelect(true)}
            color={theme.palette.secondary}
            underline="hover"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
            >
              {uRIData?.image ? (
                <img
                  src={uRIData?.image}
                  alt={uRIData?.name}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 120,
                    backgroundColor: theme.tertiaryColor2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DoNotDisturbOnIcon fontSize="large" />
                </Box>
              )}
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.8em", maxWidth: "120px" }}>
                {uRIData?.name}
              </Typography>
            </Box>
          </Link>
        </Box>
      </Grid>
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
              {uRIData?.attributes &&
                typeof uRIData?.attributes?.map === "function" &&
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
                // @ts-ignore
                href={`https://solana.fm/address/${data?.mintAddress.toBase58()}?cluster=${cluster}-solana`}
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
  const { name } = currentCluster();
  const metaplex = useMetaplex();
  const { enqueueSnackbar } = useSnackbar();

  const [nfts, setNfts] = useState<FindNftsByOwnerOutput>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const nftMeta = profile.publicAddress
          ? await metaplex
              ?.nfts()
              .findAllByOwner({ owner: new PublicKey(profile.publicAddress) })
          : [];
        setNfts(nftMeta);
      } catch (error) {
        displayError(error, enqueueSnackbar);
      } finally {
        setLoading(false);
      }
    })();
  }, [profile.publicAddress]);

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
          <Grid container spacing={2}>
            {nfts &&
              nfts.map((nft: Metadata | Nft | Sft) => (
                <NFTTile data={nft} key={nft.uri} cluster={name} />
              ))}
          </Grid>
        </Stack>
      ) : (
        <Box pt={10} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No NFTs in your wallet</Typography>
        </Box>
      )}
    </>
  );
};

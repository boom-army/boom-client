import React, { useState, useContext, FormEvent, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import {
  Button,
  TextField,
  styled,
  Container,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  Card,
  CardMedia,
  Chip,
  Modal,
  Stack,
  CircularProgress,
} from "@mui/material";
import { SOSOL_HOST_ID } from "../../utils/ids";
import { displayError } from "../../utils";
import { uniqBy } from "lodash";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSnackbar } from "../../contexts/snackbar";
import { ThemeContext } from "../../contexts/theme";
import { useUmi } from "../../contexts/umi";
import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { useMetaplex } from "../../contexts/metaplex";
import { walletAdapterIdentity } from "@metaplex-foundation/js";

const ImageInput = styled("input")({
  display: "none",
});

enum MetadataCategory {
  Audio = "audio",
  Video = "video",
  Image = "image",
}

interface FileObj {
  uri: String;
  type: String;
}

interface Attributes {
  trait_type?: String;
  value?: String;
}

export const NFTMint: React.FC = (props) => {
  const { theme } = useContext(ThemeContext);
  const umi = useUmi();
  const metaplex = useMetaplex();
  const wallet = useWallet();
  const { publicKey } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const [isMinting, setMinting] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (uploadProgress > 0) {
      enqueueSnackbar("Uploading...", {
        variant: "info",
        progress: uploadProgress,
      });
    }
  }, [uploadProgress]);

  const defaultFieldsState = {
    name: "",
    symbol: "",
    description: "",
    external_url: "",
    animation_url: undefined,
    attributes: [] as Attributes[],
    seller_fee_basis_points: 500,
    collection: { name: "", family: "" },
    properties: {
      files: [] as FileObj[],
      category: MetadataCategory.Image,
      creators: [{ address: SOSOL_HOST_ID.toBase58(), share: 100 }],
    },
  };
  const [fields, setFields] = useState(defaultFieldsState);

  const handleImageChange = async (e: any) => {
    if (!publicKey) throw new Error("Wallet not connected");
    try {
      const file = e?.target?.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      console.log(error);
    } finally {
      // reset value so the input event handler can trigger again
      e.target.value = null;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMinting(true);
    try {
      if (!publicKey || !wallet) throw new Error("Wallet not connected");
      if (!image) throw new Error("You need to upload an image");
      if (!fields.name) throw new Error("You need to add a name");
      if (!fields.description) throw new Error("You need to add a description");
      if (!fields.collection.name || !fields.collection.family)
        throw new Error("You need to add a collection name and family");

      metaplex?.use(walletAdapterIdentity(wallet));

      // Upload image and JSON data.
      const imageFile = await createGenericFileFromBrowserFile(image);
      const [imageUri] = await umi.uploader.upload([imageFile], {
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });
      setFields((attr) => {
        attr.properties.files.push({
          uri: imageUri,
          type: imageFile?.contentType || "",
        });
        attr.properties.creators.push({
          address: publicKey?.toBase58(),
          share: 0,
        });
        attr.properties.files = uniqBy(attr.properties.files, "uri");
        attr.properties.creators = uniqBy(attr.properties.creators, "address");
        return { ...attr };
      });
      const uri = await umi.uploader.uploadJson(
        { ...fields, image: imageUri },
        {
          onProgress: (progress) => {
            setUploadProgress(progress);
          },
        }
      );

      const mint = await metaplex?.nfts().create({
        uri,
        name: fields.name,
        sellerFeeBasisPoints: fields.seller_fee_basis_points,
      });

      setFields(defaultFieldsState);
      enqueueSnackbar("Successful mint:", {
        variant: "success",
        action: snackAction(mint?.mintAddress),
      });
    } catch (e: any) {
      console.log(e);
      displayError(e, enqueueSnackbar);
    } finally {
      setMinting(false);
      setPreview(null);
      setImage(null);
    }
  };

  const addAttr = () => {
    const values = { ...fields };
    values.attributes = [...values.attributes, { trait_type: "", value: "" }];
    setFields(values);
  };

  const removeAttr = (i: number) => {
    const values = { ...fields };
    values.attributes.splice(i, 1);
    setFields(values);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFields((attr) => ({
      ...attr,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Mint your own NFT Collection
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <ImageInput
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    hidden
                    onChange={handleImageChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth
                      endIcon={<PhotoCamera />}
                    >
                      Upload NFT Image
                    </Button>
                  </label>
                </Box>
                <Box mt={2} mb={2}>
                  {preview && (
                    <Card>
                      <CardMedia component="img" image={preview} />
                    </Card>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  autoFocus
                  id="name"
                  label="Name"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.secondaryColor },
                  }}
                  InputProps={{
                    style: { color: theme.secondaryColor },
                  }}
                  value={fields.name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="collection.family"
                  required
                  fullWidth
                  id="input-collection-family"
                  label="Collection Family"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.secondaryColor },
                  }}
                  InputProps={{
                    style: { color: theme.secondaryColor },
                  }}
                  value={fields.collection.family}
                  onChange={(e) => {
                    // setInputError(false);
                    setFields((attr) => ({
                      ...attr,
                      collection: {
                        family: e.target.value,
                        name: attr.collection.name,
                      },
                    }));
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="collection.name"
                  required
                  fullWidth
                  id="input-collection-name"
                  label="Collection Name"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.secondaryColor },
                  }}
                  InputProps={{
                    style: { color: theme.secondaryColor },
                  }}
                  value={fields.collection.name}
                  onChange={(e) => {
                    // setInputError(false);
                    setFields((attr) => ({
                      ...attr,
                      collection: {
                        family: attr.collection.family,
                        name: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  multiline={true}
                  rows={4}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.secondaryColor },
                  }}
                  InputProps={{
                    style: { color: theme.secondaryColor },
                  }}
                  value={fields.description}
                  onChange={handleFormChange}
                />
              </Grid>
              <>
                {fields.attributes.length ? (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        marginTop: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography component="p">Attributes</Typography>
                    </Box>
                  </Grid>
                ) : null}
                {fields.attributes.map((attr, i) => (
                  <>
                    <Grid item key={`atrribute-trait-${i}`} md={6} xs={12}>
                      <TextField
                        name={`attributes[${i}].trait_type`}
                        required
                        fullWidth
                        autoFocus
                        id={`trait${i}`}
                        label="Trait type"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: theme.secondaryColor },
                        }}
                        InputProps={{
                          style: { color: theme.secondaryColor },
                        }}
                        value={fields?.attributes[i]?.trait_type}
                        onChange={(e) => {
                          // setInputError(false);
                          fields.attributes[i].trait_type = e.target.value;
                          const attributes = fields.attributes;
                          setFields((attr) => ({
                            ...attr,
                            attributes,
                          }));
                        }}
                      />
                    </Grid>
                    <Grid item key={`atrribute-value-${i}`} md={6} xs={12}>
                      <TextField
                        name={`attributes[${i}].value`}
                        required
                        fullWidth
                        id={`value${i}`}
                        label="Value"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: theme.secondaryColor },
                        }}
                        InputProps={{
                          style: { color: theme.secondaryColor },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Remove attribute field"
                                onClick={() => removeAttr(i)}
                              >
                                <ClearIcon sx={{ color: theme.accentColor }} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        value={fields?.attributes[i]?.value}
                        onChange={(e) => {
                          // setInputError(false);
                          fields.attributes[i].value = e.target.value;
                          const attributes = fields.attributes;
                          setFields((attr) => ({
                            ...attr,
                            attributes,
                          }));
                        }}
                      />
                    </Grid>
                  </>
                ))}
                <Grid item xs={12}>
                  <Button
                    sx={{ mt: 3, mb: 2 }}
                    variant="text"
                    onClick={addAttr}
                  >
                    + Add an NFT attribute
                  </Button>
                </Grid>
              </>
              {/* TODO: investigate alpha/node_modules/@metaplex-foundation/mpl-token-metadata/dist/src/transactions/MintNewEditionFromMasterEditionViaToken.d.ts for editions */}
              {/* <Grid item xs={12}>
                <TextField
                  name="nft-number"
                  required
                  fullWidth
                  id="nft-number"
                  label="Number of NFTs to mint"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.secondaryColor },
                  }}
                  InputProps={{
                    style: { color: theme.secondaryColor },
                  }}
                  value={nftCount}
                  onChange={(e) => {
                    // setInputError(false);
                    const n = Number(e.target.value);
                    if (n > 100)
                      return displayError(
                        new Error("Minting limited to 100 max for beta."),
                        enqueueSnackbar
                      );
                    setNFTCount(n);
                  }}
                />
              </Grid> */}
              <Grid item xs={12} mb={12}>
                <Button
                  disabled={isMinting}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Mint your NFT
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Modal
          open={isMinting}
          aria-labelledby="NFT action select"
          aria-describedby="Apply action for given NFT"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              padding: 3,
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
              alignItems="center"
              mb={2}
            >
              <Typography id="nft-modal-title" variant="h6" component="h2">
                Minting your NFT{" "}
                <CircularProgress
                  size={16}
                  sx={{
                    "&.MuiSvgIcon": {
                      color: (theme) => theme.accentColor,
                    },
                  }}
                />
              </Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              You'll need to approve 3 transations for your files to be uploaded
              to the blockchain. This may take a few minutes.
            </Typography>
            <Box display="flex">
              <Stack spacing={2}>
                {preview && (
                  <img src={preview} alt={fields?.name} width="120" />
                )}
              </Stack>
              <Box
                ml={2}
                display="flex"
                flexDirection="column"
                sx={{
                  overflow: "hidden",
                  flexWrap: "wrap",
                  alignContent: "flex-start",
                }}
              >
                <Typography variant="subtitle1">
                  {fields.description}
                </Typography>
                <Typography variant="body2">
                  {fields.collection.family}
                </Typography>
                <Typography variant="body2" mb={1}>
                  {fields.collection.name}
                </Typography>
                {fields?.attributes &&
                  typeof fields?.attributes?.map === "function" &&
                  fields.attributes.map((nftItem) => (
                    <Chip
                      key={`${nftItem.trait_type}-${nftItem.value}`}
                      label={`${nftItem.trait_type}: ${nftItem.value}`}
                      variant="outlined"
                      size="small"
                      sx={{
                        margin: "0.25em 0.5em 0.25em 0",
                        fontSize: "0.7em",
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};
function snackAction(
  mintAddress: import("@solana/web3.js").PublicKey | undefined
): React.ReactNode {
  throw new Error("Function not implemented.");
}

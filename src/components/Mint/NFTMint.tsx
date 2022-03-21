import React, { useState, useContext } from "react";
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
} from "@mui/material";
import { SIGN_FILE } from "../../queries/files";
import { SOSOL_HOST_ID } from "../../utils/ids";
import { actions, Wallet } from "@metaplex/js";
import { displayError } from "../../utils";
import { uniqBy } from "lodash";
import { uploadFile } from "../../utils";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { ThemeContext } from "../../contexts/theme";

const { mintNFT } = actions;

const ImageInput = styled("input")({
  display: "none",
});

enum MetadataCategory {
  Audio = "audio",
  Video = "video",
  Image = "image",
}

enum AWSBucket {
  NFT = "nft",
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
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet as Wallet;
  const { enqueueSnackbar } = useSnackbar();
  const [signFileMutation] = useMutation(SIGN_FILE);

  // TODO: need to use metaplex/js/packages/cli/src/helpers/upload/arweave-bundle.ts
  // for uploads to store data on arweave and creators pays storage fees on mint

  const [isMinting, setMinting] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");
  // const [nftCount, setNFTCount] = useState(1);

  const defaultFieldsState = {
    name: "a",
    symbol: "",
    description: "b",
    external_url: "",
    image:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIwemVhbGFuZCUyMHBlb3BsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    animation_url: undefined,
    attributes: [] as Attributes[],
    seller_fee_basis_points: 500,
    collection: { name: "c", family: "d" },
    properties: {
      files: [] as FileObj[],
      category: MetadataCategory.Image,
      creators: [{ address: SOSOL_HOST_ID.toBase58(), share: 100 }],
    },
  };
  const [fields, setFields] = useState(defaultFieldsState);

  const handleImageUpload = async (e: any) => {
    try {
      const file = e?.target?.files[0];
      // Rename the file so upload is unique
      const blob = file.slice(0, file.size, file.type);
      const renamed = new File(
        [blob],
        `${wallet.publicKey.toBase58()}-${file.name}`,
        { type: file.type }
      );

      const { data } = await signFileMutation({
        variables: {
          file: renamed.name,
          type: renamed.type,
          bucket: AWSBucket.NFT,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadFile(renamed, signedUrl, enqueueSnackbar);
      const imageUrl = imageData?.config?.url?.split("?")[0] as string;

      setFileName(renamed.name);
      setFields((attr) => {
        attr.properties.files.push({ uri: imageUrl, type: file?.type });
        attr.properties.creators.push({
          address: wallet?.publicKey?.toBase58(),
          share: 0,
        });
        attr.properties.files = uniqBy(attr.properties.files, "uri");
        attr.properties.creators = uniqBy(attr.properties.creators, "address");
        return { ...attr, image: imageUrl };
      });
    } catch (error) {
      console.log(error);
    } finally {
      // reset value so the input event handler can trigger again
      e.target.value = null;
    }
  };

  const handleURIUpload = async () => {
    var JSONAttr = JSON.stringify(fields);
    const blob = new Blob([JSONAttr], { type: "application/json" });
    const blobFile = new File([blob], `${fileName}.json`);
    const { data } = await signFileMutation({
      variables: {
        file: blobFile.name,
        type: blobFile.type,
        bucket: AWSBucket.NFT,
      },
    });
    const signedUrl = data.signFileUrl;
    const fileData = await uploadFile(blob, signedUrl, enqueueSnackbar);
    const fileUrl = fileData?.config?.url?.split("?")[0];
    return fileUrl;
  };

  const mint = async () => {
    setMinting(true);
    try {
      if (!fields.image) throw new Error("You need to upload an image");
      if (!fields.name) throw new Error("You need to add a name");
      if (!fields.description) throw new Error("You need to add a description");
      if (!fields.collection.name || !fields.collection.family)
        throw new Error("You need to add a collection name and family");

      const uri = (await handleURIUpload()) as string;

      const _nft = await mintNFT({
        connection,
        wallet,
        uri,
        maxSupply: 1,
      });

      setFields(defaultFieldsState);
      enqueueSnackbar(`Successful mint: ${_nft.txId}`, {
        variant: "success",
      });
    } catch (e: any) {
      console.log(e);
      displayError(e, enqueueSnackbar);
    } finally {
      setMinting(false);
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
                  <label htmlFor="contained-button-file">
                    <ImageInput
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleImageUpload}
                    />
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
                  {fields.image && (
                    <img
                      src={fields.image}
                      alt="Preview for NFT upload"
                      width="100%"
                    />
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
                  onClick={mint}
                >
                  Mint your NFT
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

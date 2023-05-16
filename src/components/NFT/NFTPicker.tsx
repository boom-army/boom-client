import { useEffect, useState, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import cuid from "cuid";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { PublicKey } from "@solana/web3.js";
import { ReactComponent as NFTIcon } from "../../icons/nft.svg";

import { camelizeKeys, displayError } from "../../utils";
import { useConnection } from "@solana/wallet-adapter-react";
import { useMetaplex } from "../../contexts/metaplex";
import { useSnackbar } from "../../contexts/snackbar";

export const NFTPicker: React.FC<{
  setNftData: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setNftData }) => {
  const [nftForm, toggleNftForm] = useState(false);
  const [nftInput, setNftInput] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [validKey, setValidKey] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [fetchNftData, setFetchNftData] = useState(false);

  const theme = useTheme();
  const metaplex = useMetaplex();
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setNftInput("");
    setMetadata(null);
    setNftData(null);
    toggleNftForm(false);
    setValidKey(null);
  };
  const nftKey = cuid();

  const handleSelect = () => {
    setNftInput("");
    setNftData(metadata);
    setMetadata(null);
    toggleNftForm(false);
    setValidKey(null);
  };

  useEffect(() => {
    if (!fetchNftData) return;
    setLoading(true);
    (async () => {
      try {
        if (!nftInput) return;
        const publicKey = new PublicKey(nftInput);
        const nft = await metaplex
          ?.nfts()
          .findByMint({ mintAddress: publicKey, loadJsonMetadata: true });
        const meta: any =
          nft &&
          (await fetch(nft.uri)
            .then((response) => response.json())
            .then((data) => camelizeKeys(data)));

        if (nft?.model !== "nft")
          throw new Error("No NFT found with that public key");
        if (nft?.address) {
          setMetadata({
            publicKey,
            name: nft.name,
            symbol: nft.symbol,
            description: meta.description || "",
            externalUrl: nft.uri,
            sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
            image: meta.image,
            attributes: meta.attributes,
            collection: meta.collection,
            properties: meta.properties,
          });
          setValidKey(null);
        }
      } catch (error) {
        setValidKey(String(error));
        if (nftInput.length > 42) {
          displayError(error, enqueueSnackbar);
        }
      } finally {
        setLoading(false);
        setFetchNftData(false);
      }
    })();
  }, [nftInput, validKey, connection, enqueueSnackbar]);

  useEffect(() => {
    setFetchNftData(true);
  }, [nftInput, validKey]);

  return (
    <>
      <IconButton onClick={() => toggleNftForm(!nftForm)}>
        <NFTIcon />
      </IconButton>

      {nftForm && (
        <>
          <Dialog
            open={nftForm}
            onClose={handleClose}
            aria-describedby="nft-picker-dialog"
            sx={{
              border: `1px solid ${theme.blue.light}`,
            }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Select an NFT to display
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the NFT Public Mint Key of any Solana NFT to display it in
                your meep.
              </DialogContentText>
            </DialogContent>
            <Box
              sx={{
                minWidth: 600,
                maxWidth: 600,
                height: "auto",
                color: theme.palette.primary,
                background: theme.background,
                padding: "1rem",
              }}
            >
              <Stack
                direction="column"
                sx={{ height: "100%" }}
                key="StackInput"
              >
                <TextField
                  key={nftKey}
                  label="NFT Public Key"
                  placeholder="eg. 43QrHJ2csgLsRUhXW7WHQecZhRLFHW88sazGvUT65vYj"
                  id="nft-input"
                  error={validKey !== null}
                  helperText={validKey}
                  value={nftInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNftInput(e.currentTarget.value);
                  }}
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ paddingRight: "0.5rem" }}
                      >
                        {loading && (
                          <CircularProgress
                            size={16}
                            sx={{
                              "&.MuiSvgIcon": {
                                color: (theme) => theme.accentColor,
                              },
                            }}
                          />
                        )}
                        {!loading && validKey === null && metadata && (
                          <CheckIcon
                            color="success"
                            sx={{
                              "&.MuiSvgIcon-colorSuccess": {
                                color: (theme) => theme.palette.success.main,
                              },
                            }}
                          />
                        )}
                        {!loading && validKey !== null && (
                          <ErrorIcon
                            color="error"
                            sx={{
                              "&.MuiSvgIcon-colorError": {
                                color: (theme) => theme.palette.error.main,
                              },
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              {metadata && (
                <>
                  <Stack
                    direction="column"
                    sx={{
                      height: "100%",
                      borderTop: "1px solid",
                      marginTop: "1rem",
                      paddingTop: "1rem",
                    }}
                    key={metadata.publicKey}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        width="150"
                        height="150"
                        className="thumb"
                        src={metadata.image}
                        alt={metadata.name}
                      />
                      <Box ml={2}>
                        <Stack direction="column" key="StackMeta">
                          <Box mb={1}>
                            <Typography variant="body1">
                              {metadata.name}
                            </Typography>
                          </Box>
                          <Box mb={2}>
                            <Typography variant="body2">
                              {metadata.description}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                            }}
                          >
                            {metadata.attributes &&
                              // @ts-ignore
                              metadata.attributes.map((attr) => (
                                <Box
                                  mr={1}
                                  mb={1}
                                  key={attr.traitType + attr.value}
                                >
                                  <Chip
                                    label={attr.traitType + " | " + attr.value}
                                    color="info"
                                    variant="outlined"
                                  />
                                </Box>
                              ))}
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      borderTop: "1px solid",
                      marginTop: "1rem",
                      paddingTop: "1rem",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  ></Box>
                </>
              )}
            </Box>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {metadata && <Button onClick={handleSelect}>Select</Button>}
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

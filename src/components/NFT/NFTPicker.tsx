import { useEffect, useState, useContext, useCallback } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
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
  InputBase,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Connection, PublicKey } from "@solana/web3.js";
import { CircularProgress } from "@mui/material";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { ReactComponent as NFTIcon } from "../../icons/nft.svg";
import { ThemeContext } from "../../contexts/theme";
import { camelizeKeys, displayError } from "../../utils";
import { useConnection } from "@solana/wallet-adapter-react";
import { useSnackbar } from "../../contexts/snackbar";
import cuid from "cuid";

export const NFTPicker: React.FC<{
  setNftData: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setNftData }) => {
  const [nftForm, toggleNftForm] = useState(false);
  const [nftInput, setNftInput] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [validKey, setValidKey] = useState<null | Boolean>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const handleClose = () => {
    setNftInput("");
    setMetadata(null);
    setNftData(null);
    toggleNftForm(false);
  };
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();
  const nftKey = cuid();

  const handleSelect = () => {
    setNftInput("");
    setNftData(metadata);
    setMetadata(null);
    toggleNftForm(false);
  };

  const fetchSetMeta = useCallback(
    async (connection: Connection, key: PublicKey) => {
      const mintMeta = key && (await Metadata.findByMint(connection, key));
      const uri = mintMeta.data.data.uri;
      if (uri) {
        const data: any = await fetch(uri)
          .then((response) => response.json())
          .then((data) => camelizeKeys(data));
        data.publicKey = key.toString();
        setMetadata({
          publicKey: data.publicKey,
          name: data.name,
          symbol: data.symbol,
          description: data.description,
          externalUrl: data.externalUrl,
          sellerFeeBasisPoints: data.sellerFeeBasisPoints,
          image: data.image,
          attributes: data.attributes,
          collection: data.collection,
          properties: data.properties,
        });
        setValidKey(true);
      }
    },
    []
  );

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        if (!nftInput) return;
        const key = new PublicKey(nftInput);
        const acc = await connection.getParsedAccountInfo(key);

        if (!acc.value) throw new Error("No NFT found with that public key");
        // @ts-ignore: error in types
        if (acc && acc?.value?.data?.parsed.info.mint) {
          // @ts-ignore: error in types
          const mintKey = new PublicKey(acc.value.data.parsed.info.mint);
          await fetchSetMeta(connection, mintKey);
        }
        // @ts-ignore: error in types
        if (Math.floor(acc?.value?.data?.parsed.info.supply) === 1) {
          await fetchSetMeta(connection, key);
        }
      } catch (error) {
        setValidKey(false);
        if (nftInput.length > 42) {
          displayError(error, enqueueSnackbar);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [nftInput, validKey, connection, enqueueSnackbar, fetchSetMeta]);

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
                color: theme.primaryColor,
                background: theme.background,
                padding: "1rem",
              }}
            >
              <Stack
                direction="column"
                sx={{ height: "100%" }}
                key="StackInput"
              >
                <InputLabel
                  shrink
                  htmlFor="nft-input"
                  sx={{ color: theme.primaryColor }}
                >
                  NFT Public Key
                </InputLabel>
                <InputBase
                  key={nftKey}
                  placeholder="eg. 43QrHJ2csgLsRUhXW7WHQecZhRLFHW88sazGvUT65vYj"
                  id="nft-input"
                  value={nftInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNftInput(e.currentTarget.value);
                  }}
                  autoFocus
                  endAdornment={
                    validKey !== null && (
                      <InputAdornment
                        position="end"
                        sx={{ paddingRight: "0.5rem" }}
                      >
                        {loading && (
                          <CircularProgress size={16} color="secondary" />
                        )}
                        {!loading &&
                          (validKey === true ? (
                            <CheckIcon color="success" />
                          ) : (
                            <ClearIcon color="error" />
                          ))}
                      </InputAdornment>
                    )
                  }
                  sx={{
                    border: `1px solid ${theme.secondaryColor}`,
                    padding: 1,
                    color: theme.primaryColor,
                    borderRadius: "4px",
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

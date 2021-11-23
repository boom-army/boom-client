import { useEffect, useState, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import ModalUnstyled from "@mui/core/ModalUnstyled";
import {
  Box,
  InputAdornment,
  InputBase,
  InputLabel,
  Stack,
} from "@mui/material";
import { ReactComponent as NFTIcon } from "../../icons/nft.svg";
import { ThemeContext } from "../../contexts/theme";
import { styled } from "@mui/system";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import { displayError } from "../../utils";
// import { METADATA_PROGRAM_ID } from "../../utils/ids";
import { programs } from '@metaplex/js';
const { metadata: { Metadata }} = programs;


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  & .MuiInputBase-input {
    padding: 10px 12px;
    width: 100%;
  }
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

// TODO: integrate this with theme when whichape delivers it
const Wrapper = styled("span")`
  & .nft-pick {
    margin-right: 2rem;
    width: 26px;
    height: 26px;
    display: inline-block;
    & svg {
      width: 26px;
      cursor: pointer;
      & path {
        fill: #ca2055;
      }
    }
  }
`;

interface NFTObject {
  name: String;
  description: String;
}

export const NFTPicker: React.FC<{
  setNft: React.Dispatch<React.SetStateAction<NFTObject>>;
}> = ({ setNft }) => {
  const [nftForm, toggleNftForm] = useState(false);
  const [nftInput, setNftInput] = useState("");
  const [validKey, setValidKey] = useState<null | Boolean>(null);
  const { theme } = useContext(ThemeContext);
  const handleClose = () => toggleNftForm(false);
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const key = new PublicKey(nftInput);
        const acc = await connection.getParsedAccountInfo(key);
        // @ts-ignore: error in types
        if (acc && acc.value.data.parsed.info.mint) {
          // @ts-ignore: error in types
          const mintKey = new PublicKey(acc.value.data.parsed.info.mint);
          const mintMeta = await Metadata.findMany(connection, { mint: mintKey });
          setValidKey(true);
          console.log('phantom*************', mintMeta[0].data.data.uri);   
        }
        // @ts-ignore: error in types
        if (Math.floor(acc?.value?.data?.parsed.info.supply) === 1) {
          const mintMeta = await Metadata.findMany(connection, { mint: key });
          setValidKey(true);
          console.log('mint*************', mintMeta[0].data.data.uri);
        }
      } catch (error) {
        setValidKey(false);
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [nftInput, validKey, connection, enqueueSnackbar])

  return (
    <Wrapper>
      <span className="nft-pick" onClick={() => toggleNftForm(!nftForm)}>
        <NFTIcon />
      </span>

      {nftForm && (
        <>
          <StyledModal
            open={nftForm}
            onClose={handleClose}
            BackdropComponent={Backdrop}
          >
            <Box
              sx={{
                position: "absolute",
                minWidth: 600,
                maxWidth: 600,
                overflowX: "hidden",
                overflowY: "hidden",
                height: "auto",
                top: "10rem",
                color: theme.primaryColor,
                background: theme.background,
                padding: "1rem",
              }}
            >
              <Stack direction="column" sx={{ height: "100%" }}>
                <InputLabel
                  shrink
                  htmlFor="nft-input"
                  sx={{ color: theme.primaryColor }}
                >
                  NFT Public Key
                </InputLabel>
                <InputBase
                  placeholder="eg. 43QrHJ2csgLsRUhXW7WHQecZhRLFHW88sazGvUT65vYj"
                  id="nft-input"
                  value={nftInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNftInput(e.currentTarget.value);
                  }}
                  endAdornment={
                    validKey !== null &&
                    <InputAdornment
                      position="end"
                      sx={{ paddingRight: "0.5rem" }}
                    >
                      {validKey === true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
                    </InputAdornment>
                  }
                  sx={{
                    border: `1px solid ${theme.secondaryColor}`,
                    color: theme.primaryColor,
                    borderRadius: "4px",
                  }}
                />
              </Stack>
            </Box>
          </StyledModal>
        </>
      )}
    </Wrapper>
  );
};

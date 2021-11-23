import { useEffect, useState, useContext } from "react";
import { ReactComponent as NFTIcon } from "../../icons/nft.svg";
import { alpha, styled } from "@mui/system";
import {
  InputLabel,
  InputAdornment,
  InputBase,
  Box,
  Stack,
} from "@mui/material";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { ThemeContext } from "../../contexts/theme";
import CheckIcon from "@mui/icons-material/Check";

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
  const { theme } = useContext(ThemeContext);
  const handleClose = () => toggleNftForm(false);

  const handleNftSearch = (e: Element) => {
    console.log(e);
  };

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
                    setNftInput(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ paddingRight: "0.5rem" }}
                    >
                      <CheckIcon color="success" />
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

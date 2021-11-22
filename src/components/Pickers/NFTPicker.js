import { useEffect, useState, useContext } from "react";
import { ReactComponent as NFTIcon } from "../../icons/nft.svg";
import { alpha, styled } from "@mui/system";
import { InputLabel, InputBase } from "@mui/material";

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
  & .MuiInputBase-input {
    border-radius: 4px;
    background: red;
    padding: 10px 12px;
    width: 100%;
    border: 1px solid #ced4da;
  }
`;

export const NFTPicker = () => {
  const [nftForm, toggleNftForm] = useState(false);

  const handleNftSearch = (e) => {
    console.log(e);
  };

  return (
    <Wrapper>
      <span className="nft-pick" onClick={() => toggleNftForm(!nftForm)}>
        <NFTIcon />
      </span>

      {nftForm && (
        <>
          <InputLabel shrink htmlFor="nft-input">
            NFT Public Key
          </InputLabel>
          <InputBase
            defaultValue="eg. 43QrHJ2csgLsRUhXW7WHQecZhRLFHW88sazGvUT65vYj"
            id="nft-input"
          />
        </>
      )}
    </Wrapper>
  );
};

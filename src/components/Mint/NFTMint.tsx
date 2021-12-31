import React, { useState } from "react";
import { Button } from "@mui/material";
import { actions, Wallet } from "@metaplex/js";
import { displayError } from "../../utils";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";

const { mintNFT } = actions;

enum MetadataCategory {
  Audio = "audio",
  Video = "video",
  Image = "image",
}

export const NFTMint: React.FC = (props) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet as Wallet;
  const { enqueueSnackbar } = useSnackbar();

  // TODO: need to use metaplex/js/packages/cli/src/helpers/upload/arweave-bundle.ts
  // for uploads

  const [isMinting, setMinting] = useState<boolean>(false);
  const [attributes, setAttributes] = useState({
    name: "",
    symbol: "",
    description: "",
    external_url: "",
    image: "",
    animation_url: undefined,
    attributes: undefined,
    seller_fee_basis_points: 0,
    creators: [],
    properties: {
      files: [],
      category: MetadataCategory.Image,
    },
  });

  const mint = async () => {
    // const metadata = {
    //   name: attributes.name,
    //   symbol: attributes.symbol,
    //   creators: attributes.creators,
    //   description: attributes.description,
    //   sellerFeeBasisPoints: attributes.seller_fee_basis_points,
    //   image: attributes.image,
    //   animation_url: attributes.animation_url,
    //   attributes: attributes.attributes,
    //   external_url: attributes.external_url,
    //   properties: {
    //     files: attributes.properties.files,
    //     category: attributes.properties?.category,
    //   },
    // };
    setMinting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('boom');
      
      // const _nft = await mintNFT({
      //   connection,
      //   wallet,
      //   uri: "",
      //   maxSupply: 1,
      // });

      // if (_nft) console.log("*******************", _nft);
    } catch (e: any) {
      console.log(e.message);
      displayError(e, enqueueSnackbar);
    } finally {
      setMinting(false);
    }
  };
  return (
    <>
      <Box>
        <Button disabled={isMinting} variant="contained" onClick={() => mint()}>Mint NFT</Button>
      </Box>
    </>
  );
};

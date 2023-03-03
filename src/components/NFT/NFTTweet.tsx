import React from "react";
import { Box, Stack, Chip, Typography } from "@mui/material";
// import { NFTObject } from "./NFTPicker";
// import { ExplorerLink } from "../ExplorerLink";
// import { ENDPOINTS } from "../../contexts/connection";

export const NFTTweet: React.FC<{
  nftData: any;
}> = ({ nftData }) => {
  // const endpoint = import.meta.env.VITE_RPC_URL as string;
  // const context = ENDPOINTS.filter((obj) => obj.endpoint === endpoint)[0];
  // const explorerLink = `https://explorer.solana.com/address/${nftData.publicKey}?cluster=${context.name}`;

  return (
    <>
      <Stack direction="column" key={"NFTStack" + nftData.name}>
        <Box>
          <img width="90%" src={nftData.image} alt={nftData.name} />
        </Box>
        <Box mb={1}>
          <Typography variant="body1">{nftData.name}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body2">{nftData.description}</Typography>
        </Box>
        <Box
          mb={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {nftData?.attributes &&
            // @ts-ignore
            nftData?.attributes.map((attr) => (
              <Box mr={1} mb={1} key={attr.traitType + attr.value}>
                <Chip
                  label={attr.traitType + " | " + attr.value}
                  color="info"
                  variant="outlined"
                />
              </Box>
            ))}
          {/* <Box mr={1} mb={1}>
            <Link href={explorerLink}>
              <Chip
                label={ <ExplorerLink address={nftData.publicKey} type="address" /> }
                color="success"
              />
            </Link>
          </Box> */}
        </Box>
      </Stack>
    </>
  );
};

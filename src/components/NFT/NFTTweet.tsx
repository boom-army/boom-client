import React from "react";
import { Box, Stack, Chip, Typography } from "@mui/material";
import { NFTObject } from "./NFTPicker";
import { ExplorerLink } from "../ExplorerLink";

export const NFTTweet: React.FC<{
  nftData: NFTObject;
}> = ({ nftData }) => {
  return (
    <>
      <Stack direction="column">
        <Box>
          <img
            width="90%"
            src={nftData.image}
            alt={nftData.name}
          />
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
            nftData?.attributes.map((attr) => (
              <Box mr={1} mb={1}>
                <Chip
                  label={attr.trait_type + " | " + attr.value}
                  color="info"
                  variant="outlined"
                />
              </Box>
            ))}
          <Box mr={1} mb={1}>
            <Chip
              label={<ExplorerLink address={nftData.publicKey} type="address" />}
              component="a"
              href={"https://explorer.solana.com/address/" + nftData.publicKey}
              color="success"
              variant="outlined"
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
};

import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

export const DAOView = () => {
  const handleSignUp = () => {};

  return (
    <Grid container justifyContent="center">
      <Grid item xs={9}>
        <Box>
          <Typography variant="h2">
            Have we really been doing DAO's on Solana?
          </Typography>
          <img src="promotional-image.jpg" alt="Promotional Image" />
          <Typography variant="body1">
            Boom is about to solve NFT-based DAO solutions. Aren't you sick of
            third-party add-ons and integrations to make your DAO work? Boom is
            building the ULTIMATE solution for turn-key decentralized governance
            and community collaboration. No more hollering at your homies for
            their Telegram deets. No more trying to figure out how to get your
            DAO to work with your NFTs. Boom is here to make it all work
            seamlessly.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Button variant="contained" onClick={handleSignUp}>
          Join the Waiting List
        </Button>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          Buy a Boom Hero and be part of the alpha crew with full access and
          participation in the build
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>Shit post on Meeper while you wait</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>Read up on how our dev is progressing</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>Get some $BMA and beat the supply-demand imbalance</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          VCs get in touch to be part of the funding round
        </Typography>
      </Grid>
    </Grid>
  );
};

import React from "react";
import { MasterTweet } from "../components/Tweet/MasterTweet";
import { NFTMint } from "../components/Mint/NFTMint";
import { EditProfile } from "../views/EditProfile";
import { Route, Routes, Navigate } from "react-router-dom";
import { PeopleView, Explore, Following, News, ChannelFeed } from "../views";
import { ProfileQuery, User } from "../generated/graphql";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TipLeaderboard } from "../views/TipLeaderboard";
import { WhoToFollow } from "../components/SideBar/WhoToFollow";
import { TipRank } from "../components/SideBar/TipRank";
import { Feed } from "../views/Feed";
import { RoutePath } from "../constants";
import { headerOffset } from "../utils/boom-web3/constants";

export const GridChannel: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item md={3} display={{ xs: "none", md: "block" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h4">
            All the good DAO stuff happens here
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sm={12}
        md={5}
        sx={{
          borderRight: `1px solid ${theme.tertiaryColor}`,
          borderLeft: `1px solid ${theme.tertiaryColor}`,
        }}
      >
        <Routes>
          <Route path={RoutePath.DAO_CHANNEL} element={<ChannelFeed />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

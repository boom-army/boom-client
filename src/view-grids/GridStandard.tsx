import React from "react";
import { Profile } from "../components/Profile/Profile";
import { MasterTweet } from "../components/Tweet/MasterTweet";
import { NFTMint } from "../components/Mint/NFTMint";
import { EditProfile } from "../views/EditProfile";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  ChannelFeed,
  Channels,
  PeopleView,
  Explore,
  Following,
  Nav,
  News,
  Notifications,
} from "../views";

import { Exact, Maybe, ProfileQuery, User } from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Box, Grid, useTheme } from "@mui/material";
import { TipLeaderboard } from "../views/TipLeaderboard";
import { WhoToFollow } from "../components/SideBar/WhoToFollow";
import { TipRank } from "../components/SideBar/TipRank";
import { HeroFeed } from "../views/HeroFeed";
import { RoutePath } from "../constants";

interface GridProps {
  data: ProfileQuery | undefined;
  loading: boolean;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            handle?: Maybe<string> | undefined;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<ProfileQuery>>;
  setUser: (user: User | null) => User | void;
}

export const GridStandard: React.FC<GridProps> = ({
  data,
  loading,
  refetch,
  setUser,
}) => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        md={2}
        display={{ xs: "none", sm: "none", md: "block" }}
        sx={{ height: "calc(100vh - 49px)", overflow: "scroll" }}
      >
        <Routes>
          <Route
            path="*"
            element={
              <>
                <TipRank />
                <WhoToFollow />
              </>
            }
          />
        </Routes>
      </Grid>
      <Box
        component={Grid}
        item
        xs={12}
        sm={12}
        md={5}
        sx={{
          borderRight: `1px solid ${theme.tertiaryColor}`,
          borderLeft: `1px solid ${theme.tertiaryColor}`,
          "@media screen and (max-width: 530px)": {
            border: 0,
            paddingBottom: "2.5rem",
          },
        }}
      >
        <Routes>
          <Route path={RoutePath.PEOPLE} element={<PeopleView />} />
          <Route path={RoutePath.DAO_CHANNEL} element={<ChannelFeed />} />
          {/* <Route path={RoutePath.DAO} element={<Channels />} /> */}
          <Route path={RoutePath.EXPLORE} element={<Explore />} />
          <Route path={RoutePath.FEED} element={<HeroFeed />} />
          <Route path={RoutePath.FOLLOWING} element={<Following />} />
          <Route path={RoutePath.HANDLE_TWEET} element={<MasterTweet />} />
          <Route path={RoutePath.HANDLE} element={<Profile />} />
          <Route path={RoutePath.LEADERBOARD} element={<TipLeaderboard />} />
          <Route path={RoutePath.MINT_NFT} element={<NFTMint />} />
          <Route path={RoutePath.NEWS} element={<News />} />
          <Route
            path={RoutePath.NOTIFICATIONS}
            element={<Notifications refetchProfile={refetch} />}
          />
          <Route
            path={RoutePath.PROFILE_SETTINGS}
            element={
              <EditProfile loading={loading} data={data} setUser={setUser} />
            }
          />
          <Route
            path={RoutePath.WILDCARD}
            element={<Navigate replace to={RoutePath.HOME} />}
          />
        </Routes>
      </Box>
    </Grid>
  );
};

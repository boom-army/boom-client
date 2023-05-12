import React, { useContext } from "react";
import { Profile } from "../components/Profile/Profile";
import { MasterTweet } from "../components/Tweet/MasterTweet";
import { NFTMint } from "../components/Mint/NFTMint";
import { EditProfile } from "../views/EditProfile";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  ChannelFeed,
  Channels,
  ConnectView,
  Explore,
  Following,
  Nav,
  News,
  Notifications,
} from "../views";
import { ThemeContext } from "../contexts/theme";
import { Exact, Maybe, ProfileQuery, User } from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Grid, Paper } from "@mui/material";
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
  user: User | null;
}

export const GridStandard: React.FC<GridProps> = ({
  data,
  loading,
  refetch,
  setUser,
  user,
}) => {
  const { theme } = useContext(ThemeContext);

  const middleColStyles = {
    borderRight: `1px solid ${theme.tertiaryColor}`,
    borderLeft: `1px solid ${theme.tertiaryColor}`,

    "@media screen and (max-width: 530px)": {
      border: 0,
      paddingBottom: "2.5rem",
    },
  };
  return (
    <Grid container>
      <Grid item md={3} display={{ xs: "none", sm: "none", md: "block" }}>
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
      <Paper
        component={Grid}
        item
        xs={12}
        sm={12}
        md={9}
        sx={middleColStyles}
        elevation={0}
      >
        <Routes>
          <Route path="/" element={<HeroFeed />} />
          <Route path="following" element={<Following />} />
          <Route path="connect" element={<ConnectView />} />
          <Route path="d" element={<Channels />} />
          <Route path="news" element={<News />} />
          <Route path="d/:channelId" element={<ChannelFeed />} />
          <Route
            path="notifications"
            element={<Notifications refetchProfile={refetch} />}
          />
          <Route path=":handle/status/:tweetId" element={<MasterTweet />} />
          <Route
            path="settings/profile"
            element={
              <EditProfile loading={loading} data={data} setUser={setUser} />
            }
          />
          <Route path="explore" element={<Explore />} />
          <Route path=":handle" element={<Profile />} />
          <Route path="mint-nft" element={<NFTMint />} />
          <Route path="leaderboard" element={<TipLeaderboard />} />
          <Route path="*" element={<Navigate replace to={RoutePath.HOME} />} />
        </Routes>
      </Paper>
    </Grid>
  );
};

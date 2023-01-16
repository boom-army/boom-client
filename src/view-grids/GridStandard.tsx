import React, { useContext } from "react";
import { Profile } from "../components/Profile/Profile";
import { MasterTweet } from "../components/Tweet/MasterTweet";
import { NFTMint } from "../components/Mint/NFTMint";
import { Suggestion } from "../components/SideBar/Suggestion";
import { EditProfile } from "../views/EditProfile";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  ChannelFeed,
  Channels,
  ConnectView,
  Explore,
  Following,
  Home,
  Nav,
  News,
  Notifications,
} from "../views";
import { ThemeContext } from "../contexts/theme";
import { Exact, Maybe, ProfileQuery, User } from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Grid, Paper } from "@mui/material";
import { TipLeaderboard } from "../views/TipLeaderboard";

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
      paddingBottom: "2rem",
    },
  };
  return (
    <Grid container>
      <Paper
        component={Grid}
        item
        md={3}
        display={{ xs: "none", sm: "none", md: "block" }}
      >
        <Nav user={user} newMentionsCount={data?.profile?.newMentionsCount} />
      </Paper>
      <Paper
        component={Grid}
        item
        xs={12}
        sm={12}
        md={6}
        sx={middleColStyles}
        elevation={0}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="following" element={<Following />} />
          <Route path="connect" element={<ConnectView />} />
          <Route path="channels" element={<Channels />} />
          <Route path="news" element={<News />} />
          <Route path="channels/:channelId" element={<ChannelFeed />} />
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
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Paper>
      <Grid item md={3} display={{ xs: "none", sm: "none", md: "block" }}>
        <Routes>
          <Route path="*" element={<Suggestion />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

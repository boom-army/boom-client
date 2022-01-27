import React, { useContext, useEffect } from "react";
import { AccountsProvider } from "./contexts/accounts";
import { AppHeader } from "./components/AppHeader";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  ConnectView,
  Following,
  Home,
  Nav,
  Notifications,
  OGMint,
  Suggestion,
} from "./views";
import { Container, Grid } from "@mui/material";
import { EditProfile } from "./components/Profile/EditProfile";
import { GiphyContextProvider } from "./contexts/giphy";
import { MarketProvider } from "./contexts/market";
import { MasterTweet } from "./components/Tweet/MasterTweet";
import { NFTMint } from "./components/Mint/NFTMint";
import { Profile } from "./components/Profile/Profile";
import { ThemeContext } from "./contexts/theme";
import { UserContext } from "./contexts/user";
import { Wallet } from "./contexts/wallet";
import { useProfileLazyQuery } from "./generated/graphql";


export const AppRoutes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const [getHandle, { loading, data, refetch }] = useProfileLazyQuery();

  useEffect(() => {
    if (user?.handle) getHandle({
      variables: { handle: user?.handle },
    })
  }, [getHandle, user]);

  const middleColStyles = {
    borderRight: `1px solid ${theme.tertiaryColor}`,
    borderLeft: `1px solid ${theme.tertiaryColor}`,
  };

  return (
    <>
      <BrowserRouter basename={"/"}>
        <Wallet>
          <AccountsProvider>
            <MarketProvider>
              <GiphyContextProvider>
                <AppHeader />
                <Container maxWidth="lg">
                  <Grid container>
                    <Grid item xs={2} sm={1} md={2}>
                      {user?.handle && <Nav user={user} newMentionsCount={data?.profile?.newMentionsCount} />}
                    </Grid>
                    <Grid item xs={10} sm={11} md={7} sx={middleColStyles}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="following" element={<Following />} />
                        <Route path="connect" element={<ConnectView />} />
                        <Route
                          path="notifications"
                          element={<Notifications refetchProfile={refetch} />}
                        />
                        <Route
                          path=":handle/status/:tweetId"
                          element={<MasterTweet />}
                        />
                        <Route
                          path="settings/profile"
                          element={
                            <EditProfile
                              loading={loading}
                              data={data}
                              setUser={setUser}
                            />
                          }
                        />
                        <Route path=":handle" element={<Profile />} />
                        <Route path="mint-nft" element={<NFTMint />} />
                        <Route path="mint-nft/1303" element={<OGMint />} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                      </Routes>
                    </Grid>
                    <Grid
                      item
                      md={3}
                      display={{ xs: "none", sm: "none", md: "block" }}
                    >
                      <Suggestion />
                    </Grid>
                  </Grid>
                </Container>
              </GiphyContextProvider>
            </MarketProvider>
          </AccountsProvider>
        </Wallet>
      </BrowserRouter>
    </>
  );
};

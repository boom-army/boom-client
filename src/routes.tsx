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
import { Helmet } from "react-helmet";
import BoomArmy from "./images/raise-the-boomarmy.png";

export const AppRoutes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const [getHandle, { loading, data, refetch }] = useProfileLazyQuery();

  useEffect(() => {
    if (user?.handle)
      getHandle({
        variables: { handle: user?.handle },
      });
  }, [getHandle, user]);

  const middleColStyles = {
    borderRight: `1px solid ${theme.tertiaryColor}`,
    borderLeft: `1px solid ${theme.tertiaryColor}`,
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="http://app.boom.army" />

        <title>Boom</title>
        <meta name="title" content="Boom" />
        <meta name="description" content="NFT Driven Communities on Solana." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:title" content="Boom" />
        <meta property="og:description" content="NFT Driven Communities on Solana." />
        <meta property="og:image" content={BoomArmy}  />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.origin} />
        <meta property="twitter:title" content="Boom" />
        <meta property="twitter:description" content="NFT Driven Communities on Solana." />
        <meta property="twitter:image" content={BoomArmy} />
        <meta property="twitter:creator" content="@boom_army_" />
      </Helmet>
      <BrowserRouter basename={"/"}>
        <Wallet>
          <AccountsProvider>
            <MarketProvider>
              <GiphyContextProvider>
                <AppHeader />
                <Container maxWidth="lg">
                  <Grid container>
                    <Grid item xs={2} sm={1} md={2}>
                      {user?.handle && (
                        <Nav
                          user={user}
                          newMentionsCount={data?.profile?.newMentionsCount}
                        />
                      )}
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

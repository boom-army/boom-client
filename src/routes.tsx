import BoomArmy from "./images/raise-the-boomarmy.png";
import BoomLogo from "./images/boom-logo.png";
import React, { useContext } from "react";
import { AppHeader } from "./components/AppHeader";
import {
  Box,
  Grid,
  Slide,
  SwipeableDrawer,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GiphyContextProvider } from "./contexts/giphy";
import { Helmet } from "react-helmet";
import { UserContext } from "./contexts/user";
import { Wallet } from "./contexts/wallet";
import { useProfileQuery } from "./generated/graphql";
import { GridStandard } from "./view-grids/GridStandard";
// import { GridAuction } from "./view-grids/GridAuction";
import { Dashboard, Nav } from "./views";
import { FloatingNavbar } from "./components/FloatingNavbar";
import { drawerState, useToggleDrawer } from "./hooks";
import { useRecoilValue } from "recoil";
import { RoutePath } from "./constants";
import { DAOView } from "./views/DAO";
import { MiniDrawer, MobileBottomNav } from "./components/Nav";

export const AppRoutes: React.FC = () => {
  const theme = useTheme();
  const { user, setUser } = useContext(UserContext);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hideDrawer = useMediaQuery(theme.breakpoints.down("md"));
  const trigger = useScrollTrigger();
  const toggleDrawer = useToggleDrawer();
  const drawer = useRecoilValue(drawerState);

  const { loading, data, refetch } = useProfileQuery({
    variables: { handle: user?.handle },
  });

  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#16202B" />
        <link rel="canonical" href="http://boom.army" />
        <link rel="apple-touch-icon" href={BoomLogo} />

        <title>Boom</title>
        <meta name="title" content="Boom" />
        <meta name="description" content="NFT Driven Communities on Solana." />

        <meta name="og:type" content="website" />
        <meta name="og:url" content={window.location.origin} />
        <meta name="og:title" content="Boom" />
        <meta
          name="og:description"
          content="NFT Driven Communities on Solana."
        />
        <meta name="og:image" content={BoomArmy} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.origin} />
        <meta name="twitter:title" content="Boom" />
        <meta
          name="twitter:description"
          content="NFT Driven Communities on Solana."
        />
        <meta name="twitter:image" content={BoomArmy} />
        <meta name="twitter:creator" content="@boom_army_" />
      </Helmet>

      <BrowserRouter basename={"/"}>
        <Wallet>
          <GiphyContextProvider>
            <>
              {isMobile ? (
                <Slide appear={false} direction="down" in={!trigger}>
                  <AppHeader />
                </Slide>
              ) : (
                <AppHeader />
              )}
              <Grid container>
                {!hideDrawer ? (
                  <Grid item>
                    <MiniDrawer />
                  </Grid>
                ) : null}
                <Grid item sm={12} md={11}>
                  <Routes>
                    {/* <Route
                      path="auctions"
                      element={
                        <GridAuction />
                      }
                    /> */}
                    <Route path={RoutePath.HOME} element={<DAOView />} />
                    <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
                    <Route
                      path={RoutePath.WILDCARD}
                      element={
                        <GridStandard
                          loading={loading}
                          data={data}
                          refetch={refetch}
                          setUser={setUser}
                        />
                      }
                    />
                  </Routes>
                </Grid>
                <MobileBottomNav />
                <SwipeableDrawer
                  anchor="left"
                  open={drawer}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <Box
                    sx={{ width: "20rem", paddingLeft: "1em" }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <Nav
                      user={user}
                      newMentionsCount={data?.profile?.newMentionsCount}
                    />
                  </Box>
                </SwipeableDrawer>
              </Grid>
              <FloatingNavbar />
            </>
          </GiphyContextProvider>
        </Wallet>
      </BrowserRouter>
    </>
  );
};

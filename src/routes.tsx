import BoomArmy from "./images/raise-the-boomarmy.png";
import BoomLogo from "./images/boom-logo.png";
import React, { useContext, useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import {
  Box,
  Slide,
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
import { ChannelFeed, Dashboard } from "./views";
import { PopoutProfileMenu, PopoutNavMenu } from "./components/Nav";
import { RoutePath } from "./constants";
import { DAOView } from "./views/DAO";
import { LeftNavDrawer, MiniDrawer, MobileBottomNav } from "./components/Nav";
import { Lab } from "./views/Lab";
import { useSidebarState } from "./hooks";
import { Notifications } from "./components/Notifications";
import { Profile } from "./components/Profile/Profile";
import { headerOffset } from "./utils/boom-web3/constants";
import { GridChannel } from "./view-grids/GridChannel";

export const AppRoutes: React.FC = () => {
  const theme = useTheme();
  const { user, setUser } = useContext(UserContext);
  const { sidebar } = useSidebarState();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerHidden = useMediaQuery(theme.breakpoints.down("md"));
  // const trigger = useScrollTrigger();

  const { loading, data } = useProfileQuery({
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
                <Slide appear={false} direction="down">
                  <AppHeader />
                </Slide>
              ) : (
                <AppHeader />
              )}
              <Box display="flex">
                {!drawerHidden ? (
                  <Box display={"flex"}>
                    {!sidebar.leftSidebarFull ? (
                      <MiniDrawer />
                    ) : (
                      <LeftNavDrawer />
                    )}
                  </Box>
                ) : null}
                <Box
                  overflow="auto"
                  width="100%"
                  sx={{
                    maxWidth: "100vw",
                    maxHeight: isMobile ? "100%" : headerOffset,
                  }}
                >
                  <Routes>
                    {/* <Route
                      path="auctions"
                      element={
                        <GridAuction />
                      }
                    /> */}
                    <Route path={RoutePath.HOME} element={<DAOView />} />
                    <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
                    <Route path={RoutePath.LAB} element={<Lab />} />
                    <Route path={RoutePath.HANDLE} element={<Profile />} />
                    <Route path={RoutePath.WILDCARD} element={<GridChannel />} />
                    <Route
                      path={RoutePath.WILDCARD}
                      element={
                        <GridStandard
                          loading={loading}
                          data={data}
                          setUser={setUser}
                        />
                      }
                    />
                  </Routes>
                </Box>
                {sidebar.rightNotificationsFull ? <Notifications /> : null}
                <MobileBottomNav />
                <PopoutProfileMenu />
                <PopoutNavMenu />
              </Box>
              {/* <FloatingNavbar /> */}
            </>
          </GiphyContextProvider>
        </Wallet>
      </BrowserRouter>
    </>
  );
};

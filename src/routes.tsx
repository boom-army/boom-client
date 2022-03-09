import React, { useContext, useEffect } from "react";
import BoomArmy from "./images/raise-the-boomarmy.png";
import BoomLogo from "./images/logo.png";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
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
import { Badge, Container, Grid, Paper, SwipeableDrawer } from "@mui/material";
import { EditProfile } from "./components/Profile/EditProfile";
import { GiphyContextProvider } from "./contexts/giphy";
import { Helmet } from "react-helmet";
import { MarketProvider } from "./contexts/market";
import { MasterTweet } from "./components/Tweet/MasterTweet";
import { NFTMint } from "./components/Mint/NFTMint";
import { NavLink } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { ThemeContext } from "./contexts/theme";
import { UserContext } from "./contexts/user";
import { Wallet } from "./contexts/wallet";
import { Box, styled } from "@mui/system";
import { useProfileLazyQuery } from "./generated/graphql";
import { ChannelView } from "./views/Channels";

export const AppRoutes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = React.useState("recents");
  const [drawer, setDrawer] = React.useState(false);

  const StyledBottomNavigation = styled(BottomNavigation)({
    width: "auto",
    backgroundColor: theme.background,
    borderTop: `1px solid ${theme.tertiaryColor}`,
    "& .MuiButtonBase-root": {
      color: `${theme.secondaryColor} !important`,
      paddingTop: "1em",
    },
    "& .Mui-selected": {
      color: theme.accentColor,
      "& .MuiSvgIcon-root": {
        color: theme.accentColor,
      },
    },
    "& .MuiBadge-badge": {
      color: theme.primaryColor,
      backgroundColor: theme.accentColor,
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawer(open);
    };

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

    "@media screen and (max-width: 530px)": {
      border: 0
    },
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="http://app.boom.army" />
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
          <AccountsProvider>
            <MarketProvider>
              <GiphyContextProvider>
                <AppHeader />
                <Container maxWidth="lg">
                  <Grid container>
                    <Paper
                      component={Grid}
                      item
                      md={2}
                      display={{ xs: "none", sm: "none", md: "block" }}
                    >
                      {user?.handle && (
                        <Nav
                          user={user}
                          newMentionsCount={data?.profile?.newMentionsCount}
                        />
                      )}
                    </Paper>
                    <Paper
                      component={Grid}
                      item
                      xs={12}
                      sm={12}
                      md={7}
                      sx={middleColStyles}
                      elevation={0}
                    >
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="following" element={<Following />} />
                        <Route path="connect" element={<ConnectView />} />
                        <Route path="channels" element={<ChannelView />} />
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
                    </Paper>
                    <Grid
                      item
                      md={3}
                      display={{ xs: "none", sm: "none", md: "block" }}
                    >
                      <Suggestion />
                    </Grid>
                  </Grid>
                  <Paper
                    component={Grid}
                    sx={{
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                    display={{ xs: "block", sm: "block", md: "none" }}
                    elevation={1}
                  >
                    <StyledBottomNavigation
                      value={value}
                      onChange={handleChange}
                    >
                      <BottomNavigationAction
                        component={NavLink}
                        label="Community"
                        value="community"
                        icon={<LanguageIcon />}
                        to="/"
                      />
                      {user?.handle && (
                        <BottomNavigationAction
                          component={NavLink}
                          label="Notifications"
                          value="notifications"
                          icon={
                            <Badge
                              badgeContent={data?.profile?.newMentionsCount}
                            >
                              <NotificationsIcon />
                            </Badge>
                          }
                          to="/notifications"
                        />
                      )}
                      {user?.handle && (
                        <BottomNavigationAction
                          component={NavLink}
                          label="Profile"
                          value="profile"
                          icon={<AccountCircleIcon />}
                          to={`/${user?.handle}`}
                        />
                      )}
                      <BottomNavigationAction
                        label="Menu"
                        value="menu"
                        icon={<MenuIcon />}
                        onClick={toggleDrawer(true)}
                      />
                    </StyledBottomNavigation>
                  </Paper>
                </Container>
                <SwipeableDrawer
                  open={drawer}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{ paddingLeft: "1em" }}
                  >
                    <Nav
                      user={user}
                      newMentionsCount={data?.profile?.newMentionsCount}
                    />
                  </Box>
                </SwipeableDrawer>
              </GiphyContextProvider>
            </MarketProvider>
          </AccountsProvider>
        </Wallet>
      </BrowserRouter>
    </>
  );
};

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BoomArmy from "./images/raise-the-boomarmy.png";
import BoomLogo from "./images/boom-logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useContext } from "react";
import { AppHeader } from "./components/AppHeader";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  IconButton,
  Paper,
  Slide,
  SwipeableDrawer,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GiphyContextProvider } from "./contexts/giphy";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "./contexts/theme";
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

const MiniDrawer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  backgroundColor: theme.background,
  zIndex: theme.zIndex.drawer - 1,
  cursor: "pointer",
  borderRight: `1px solid ${theme.tertiaryColor}`,
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: "auto",
  backgroundColor: theme.background,
  borderTop: `1px solid ${theme.tertiaryColor}`,
  "& .MuiButtonBase-root": {
    color: `${theme.secondary} !important`,
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
}));

export const AppRoutes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = React.useState("recents");

  const mTheme = useTheme();
  const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));
  const trigger = useScrollTrigger();
  const toggleDrawer = useToggleDrawer();
  const drawer = useRecoilValue(drawerState);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
                        user={user}
                        setUser={setUser}
                      />
                    }
                  />
                </Routes>
                <Paper
                  component={Grid}
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                  display={{ xs: "block", sm: "block", md: "none" }}
                  elevation={3}
                >
                  <StyledBottomNavigation value={value} onChange={handleChange}>
                    <BottomNavigationAction
                      component={NavLink}
                      label="Feed"
                      value="hero-feed"
                      icon={<LanguageIcon />}
                      to={RoutePath.HOME}
                    />
                    {user?.handle && (
                      <BottomNavigationAction
                        component={NavLink}
                        label="Notifications"
                        value="notifications"
                        icon={
                          <Badge badgeContent={data?.profile?.newMentionsCount}>
                            <NotificationsIcon />
                          </Badge>
                        }
                        to={RoutePath.NOTIFICATIONS}
                      />
                    )}
                    {user?.handle && (
                      <BottomNavigationAction
                        component={NavLink}
                        label="Profile"
                        value="profile"
                        icon={<AccountCircleIcon />}
                        to={`${RoutePath.HANDLE_HASH}/${user.handle}`}
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
                <MiniDrawer
                  onClick={toggleDrawer(!drawer)}
                  display={{ xs: "none", sm: "none", md: "flex" }}
                >
                  <Box>
                    <IconButton>
                      <LanguageIcon />
                    </IconButton>
                  </Box>
                  <IconButton>
                    <MoreHorizIcon
                      sx={{
                        borderRadius: "50%",
                        border: `1px solid ${theme.primaryColor}`,
                      }}
                    />
                  </IconButton>
                </MiniDrawer>
                <SwipeableDrawer
                  anchor="right"
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

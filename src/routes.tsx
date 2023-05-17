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
  Box,
  Grid,
  IconButton,
  Paper,
  Slide,
  SwipeableDrawer,
  styled,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GiphyContextProvider } from "./contexts/giphy";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
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
  maxHeight: "calc(100vh - 49px)",
  minHeight: "calc(100vh - 49px)",
  width: "3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  zIndex: theme.zIndex.drawer - 1,
  borderRight: `1px solid ${theme.tertiaryColor}`,
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: "auto",
  backgroundColor: theme.background,
  borderTop: `1px solid ${theme.tertiaryColor}`,
  "& .MuiButtonBase-root": {
    color: `${theme.palette.secondary} !important`,
    paddingTop: "1em",
  },
  "& .Mui-selected": {
    color: theme.accentColor,
    "& .MuiSvgIcon-root": {
      color: theme.accentColor,
    },
  },
  "& .MuiBadge-badge": {
    color: theme.palette.primary,
    backgroundColor: theme.accentColor,
  },
}));

export const AppRoutes: React.FC = () => {
  const theme = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = React.useState("recents");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hideDrawer = useMediaQuery(theme.breakpoints.down("md"));
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
                {!hideDrawer ? (
                  <Grid item>
                    <MiniDrawer>
                      <Box>
                        <IconButton>
                          <LanguageIcon />
                        </IconButton>
                      </Box>
                      <IconButton>
                        <MoreHorizIcon
                          onClick={toggleDrawer(!drawer)}
                          sx={{
                            borderRadius: "50%",
                            border: `1px solid ${theme.palette.common.white}`,
                          }}
                        />
                      </IconButton>
                    </MiniDrawer>
                  </Grid>
                ) : null}
                <Grid
                  item
                  sm={12}
                  md={11}
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

import FeedIcon from "@mui/icons-material/Feed";
import HubIcon from "@mui/icons-material/Hub";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
import {
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RoutePath } from "../../constants";
import { useLocation, Link } from "react-router-dom";

interface NavIconButtonProps {
  icon: React.ReactNode;
  route: string;
}

const NavIconButton: React.FC<NavIconButtonProps> = ({ icon, route }) => {
  const theme = useTheme();
  const location = useLocation();
  const isActiveRoute = location.pathname === route;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Link to={route}>
        <IconButton
          color="inherit"
          sx={{
            "& svg": {
              color: isActiveRoute
                ? theme.accentColor
                : theme.palette.primary.main,
            },
            "&:hover": {
              "& svg": {
                color: theme.accentColor,
              },
            },
          }}
        >
          {icon}
        </IconButton>
      </Link>
    </Box>
  );
};

export const FloatingNavbar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  if (!isDesktop) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1300,
        borderRadius: "50px",
        overflow: "hidden",
        width: { md: "40%", lg: "20%" },
        boxShadow: theme.shadows[3],
        backgroundColor: theme.tertiaryColor2,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Toolbar>
        <Box
          sx={{ display: "flex", flexGrow: 1, justifyContent: "space-evenly" }}
        >
          <NavIconButton icon={<HubIcon />} route={RoutePath.HOME} />
          <NavIconButton icon={<FeedIcon />} route={`/${RoutePath.FEED}`} />
          <NavIconButton
            icon={<NewspaperIcon />}
            route={`/${RoutePath.NEWS}`}
          />
          <NavIconButton icon={<ScienceIcon />} route={`/${RoutePath.LAB}`} />
        </Box>
      </Toolbar>
    </Box>
  );
};

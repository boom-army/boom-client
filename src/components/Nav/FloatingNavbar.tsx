import FeedIcon from "@mui/icons-material/Feed";
import HubIcon from "@mui/icons-material/Hub";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RoutePath } from "../../constants";
import { NavLink } from "react-router-dom";

interface NavIconButtonProps {
  icon: React.ReactNode;
  route: string;
}

const NavIconButton: React.FC<NavIconButtonProps> = ({ icon, route }) => {
  const ActiveBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.secondary.main,
    "& .active svg": {
      color: theme.accentColor,
    },
    "&:hover": {
      "& svg": {
        color: theme.accentColor,
      },
    },
  }));
  return (
    <ActiveBox>
      <NavLink to={route}>
        <IconButton color="inherit">{icon}</IconButton>
      </NavLink>
    </ActiveBox>
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
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-evenly",
          minHeight: "3rem",
          alignItems: "center",
        }}
      >
        <NavIconButton icon={<HubIcon />} route={RoutePath.HOME} />
        <NavIconButton icon={<FeedIcon />} route={`/${RoutePath.FEED}`} />
        <NavIconButton icon={<NewspaperIcon />} route={`/${RoutePath.NEWS}`} />
        <NavIconButton icon={<ScienceIcon />} route={`/${RoutePath.LAB}`} />
      </Box>
    </Box>
  );
};

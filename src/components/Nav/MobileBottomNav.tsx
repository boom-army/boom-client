import FeedIcon from "@mui/icons-material/Feed";
import HubIcon from "@mui/icons-material/Hub";
import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../constants";
import { useToggleDrawer } from "../../hooks";

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

export const MobileBottomNav = () => {
  const [value, setValue] = React.useState("recents");
  const toggleDrawer = useToggleDrawer();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
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
          label="DAO"
          value="dao"
          icon={<HubIcon />}
          to={RoutePath.HOME}
        />
        <BottomNavigationAction
          component={NavLink}
          label="Feed"
          value="feed"
          icon={<FeedIcon />}
          to={RoutePath.FEED}
        />
        <BottomNavigationAction
          component={NavLink}
          label="News"
          value="news"
          icon={<NewspaperIcon />}
          to={RoutePath.NEWS}
        />
        <BottomNavigationAction
          component={NavLink}
          label="Labs"
          value="labs"
          icon={<ScienceIcon />}
          to={RoutePath.LAB}
        />
        <BottomNavigationAction
          label="Menu"
          value="menu"
          icon={<MenuIcon />}
          onClick={toggleDrawer(true)}
        />
      </StyledBottomNavigation>
    </Paper>
  );
};

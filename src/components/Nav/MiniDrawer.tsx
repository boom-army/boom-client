import LanguageIcon from "@mui/icons-material/Language";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HubIcon from "@mui/icons-material/Hub";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ScienceIcon from "@mui/icons-material/Science";
import { Box, IconButton, Stack, styled, useTheme } from "@mui/material";
import { RoutePath } from "../../constants";
import { NavLink } from "react-router-dom";

interface MiniDrawerProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerWrapper = styled(Box)(({ theme }) => ({
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
export const MiniDrawer: React.FC<MiniDrawerProps> = ({ setShowMenu }) => {
  const theme = useTheme();
  return (
    <DrawerWrapper>
      <Stack spacing={2}>
        <NavLink to={`${RoutePath.HOME}`}>
          <IconButton>
            <HubIcon />
          </IconButton>
        </NavLink>
        <NavLink to={`${RoutePath.FEED}`}>
          <IconButton>
            <FeedIcon />
          </IconButton>
        </NavLink>
        <NavLink to={`${RoutePath.NEWS}`}>
          <IconButton>
            <NewspaperIcon />
          </IconButton>
        </NavLink>
        <NavLink to={`${RoutePath.LAB}`}>
          <IconButton>
            <ScienceIcon />
          </IconButton>
        </NavLink>
      </Stack>
      <IconButton onClick={() => setShowMenu(true)}>
        <ChevronRightIcon
          sx={{
            borderRadius: "50%",
            border: `1px solid ${theme.palette.common.white}`,
          }}
        />
      </IconButton>
    </DrawerWrapper>
  );
};

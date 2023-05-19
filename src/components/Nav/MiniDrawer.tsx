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
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import SavingsIcon from "@mui/icons-material/Savings";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SpeedIcon from "@mui/icons-material/Speed";
import StyleIcon from "@mui/icons-material/Style";
import { Box, IconButton, styled, useTheme } from "@mui/material";
import { drawerState, useToggleDrawer } from "../../hooks";
import { useRecoilValue } from "recoil";

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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.accentColor,
}));

export const MiniDrawer = () => {
  const theme = useTheme();
  const toggleDrawer = useToggleDrawer();
  const drawer = useRecoilValue(drawerState);
  return (
    <DrawerWrapper>
      <Box>
        <StyledIconButton>
          <HubIcon />
        </StyledIconButton>
        <StyledIconButton>
          <FeedIcon />
        </StyledIconButton>
        <StyledIconButton>
          <NewspaperIcon />
        </StyledIconButton>
        <StyledIconButton>
          <ScienceIcon />
        </StyledIconButton>
      </Box>
      <IconButton>
        <ChevronRightIcon
          onClick={toggleDrawer(!drawer)}
          sx={{
            borderRadius: "50%",
            border: `1px solid ${theme.palette.common.white}`,
          }}
        />
      </IconButton>
    </DrawerWrapper>
  );
};

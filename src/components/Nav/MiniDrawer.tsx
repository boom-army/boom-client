import React from "react";
import FeedIcon from "@mui/icons-material/Feed";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HubIcon from "@mui/icons-material/Hub";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ScienceIcon from "@mui/icons-material/Science";
import { Box, IconButton, Stack, styled, useTheme } from "@mui/material";
import { RoutePath } from "../../constants";
import { NavLink } from "react-router-dom";
import { headerOffset } from "../../utils/boom-web3/constants";
import { useSidebarState } from "../../hooks";

const DrawerWrapper = styled(Box)(({ theme }) => ({
  maxHeight: headerOffset,
  minHeight: headerOffset,
  width: "3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  zIndex: theme.zIndex.drawer - 1,
  borderRight: `1px solid ${theme.tertiaryColor}`,
  cursor: "pointer",
  "& .active svg": {
    color: theme.accentColor,
  },
}));

export const MiniDrawer: React.FC = () => {
  const theme = useTheme();
  const { sidebar, toggleLeftSidebar } = useSidebarState();
  return (
    <DrawerWrapper>
      <Stack spacing={2}>
        <NavLink to={RoutePath.HOME}>
          <IconButton>
            <HubIcon color="secondary" />
          </IconButton>
        </NavLink>
        <NavLink to={RoutePath.FEED}>
          <IconButton>
            <FeedIcon color="secondary" />
          </IconButton>
        </NavLink>
        <NavLink to={RoutePath.NEWS}>
          <IconButton>
            <NewspaperIcon color="secondary" />
          </IconButton>
        </NavLink>
        <NavLink to={RoutePath.LAB}>
          <IconButton>
            <ScienceIcon color="secondary" />
          </IconButton>
        </NavLink>
      </Stack>
      <IconButton onClick={() => toggleLeftSidebar(!sidebar.leftSidebarFull)}>
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

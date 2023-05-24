import React from "react";
import { Box, IconButton, styled, useTheme } from "@mui/material";
import { Nav } from ".";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { headerOffset } from "../../utils/boom-web3/constants";
import { useSidebarState } from "../../hooks";

const DrawerWrapper = styled(Box)(({ theme }) => ({
  maxHeight: headerOffset,
  minHeight: headerOffset,
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: theme.zIndex.drawer - 1,
  borderRight: `1px solid ${theme.tertiaryColor}`,
  overflowY: "scroll",
}));

export const LeftNavDrawer: React.FC = () => {
  const theme = useTheme();
  const { sidebar, toggleLeftSidebar } = useSidebarState();

  return (
    <DrawerWrapper>
      <Nav />
      <Box display="flex" justifyContent="flex-end" py={1} width="100%">
        <IconButton onClick={() => toggleLeftSidebar(!sidebar.leftSidebarFull)}>
          <ChevronLeftIcon
            sx={{
              borderRadius: "50%",
              border: `1px solid ${theme.palette.text.primary}`,
            }}
          />
        </IconButton>
      </Box>
    </DrawerWrapper>
  );
};

import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import { Nav } from ".";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRecoilValue } from "recoil";
import { useToggleDrawer, drawerState } from "../../hooks";

const DrawerWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "calc(100vh - 49px)",
  minHeight: "calc(100vh - 49px)",
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: theme.zIndex.drawer - 1,
  borderRight: `1px solid ${theme.tertiaryColor}`,
  overflowY: "scroll",
}));

export const LeftNavDrawer = () => {
  const theme = useTheme();
  const toggleDrawer = useToggleDrawer();
  const drawer = useRecoilValue(drawerState);
  return (
    <DrawerWrapper>
      <Nav />
      <Box display="flex" justifyContent="flex-end" py={1} width="100%">
        <IconButton>
          <ChevronLeftIcon
            onClick={toggleDrawer(!drawer)}
            sx={{
              borderRadius: "50%",
              border: `1px solid ${theme.palette.common.white}`,
            }}
          />
        </IconButton>
      </Box>
    </DrawerWrapper>
  );
};

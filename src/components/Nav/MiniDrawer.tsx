import LanguageIcon from "@mui/icons-material/Language";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { Box, IconButton, styled, useTheme } from "@mui/material";
import { drawerState, useToggleDrawer } from "../../hooks";
import { useRecoilValue } from "recoil";

const MiniDrawerWrapper = styled(Box)(({ theme }) => ({
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

export const MiniDrawer = () => {
  const theme = useTheme();
  const toggleDrawer = useToggleDrawer();
  const drawer = useRecoilValue(drawerState);
  return (
    <MiniDrawerWrapper>
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
    </MiniDrawerWrapper>
  );
};

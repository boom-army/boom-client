import { Box, styled } from "@mui/material";
import React from "react";

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
}));

export const LeftNavDrawer = () => {
  return (
    <DrawerWrapper>
      <div>FullDrawer</div>
    </DrawerWrapper>
  );
};

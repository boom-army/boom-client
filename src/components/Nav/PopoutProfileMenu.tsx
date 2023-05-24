import React from "react";
import { Box, SwipeableDrawer, Typography } from "@mui/material";
import { useDrawerState } from "../../hooks";

export const PopoutProfileMenu = () => {
  const { toggleRightProfile, drawer } = useDrawerState();

  return (
    <SwipeableDrawer
      anchor="right"
      open={drawer.rightProfileOpen}
      onClose={() => toggleRightProfile(false)}
      onOpen={() => toggleRightProfile(true)}
      sx={{ "& .MuiDrawer-paper": { backgroundImage: "none" } }}
    >
      <Box sx={{ width: "20rem", pl: 2, pb: 5 }} role="presentation">
        <Typography variant="h1">Profile</Typography>
      </Box>
    </SwipeableDrawer>
  );
};

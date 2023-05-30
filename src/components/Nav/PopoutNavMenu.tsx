import React from "react";
import { Box, SwipeableDrawer } from "@mui/material";
import { Nav } from "./Nav";
import { useDrawerState } from "../../hooks";

export const PopoutNavMenu = () => {
  const { toggleLeftNav, drawer } = useDrawerState();
  
  const user = null;
  const data = {
    profile: {
      newMentionsCount: 0,
    },
  };
  return (
    <SwipeableDrawer
      anchor="left"
      open={drawer.leftNavOpen}
      onClose={() => toggleLeftNav(false)}
      onOpen={() => toggleLeftNav(true)}
      sx={{ "& .MuiDrawer-paper": { backgroundImage: "none" } }}
    >
      <Box sx={{ width: "20rem", pl: 2, pb: 5 }} role="presentation">
        <Nav />
      </Box>
    </SwipeableDrawer>
  );
};

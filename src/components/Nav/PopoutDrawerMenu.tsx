import React from "react";
import { Box, SwipeableDrawer } from "@mui/material";
import { Nav } from "./Nav";
import { drawerState, useToggleDrawer } from "../../hooks";
import { useRecoilValue } from "recoil";

export const PopoutDrawerMenu = () => {
  const toggleDrawer = useToggleDrawer();
  const drawer = useRecoilValue(drawerState);
  const user = null;
  const data = {
    profile: {
      newMentionsCount: 0,
    },
  };
  return (
    <SwipeableDrawer
      anchor="left"
      open={drawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={{ "& .MuiDrawer-paper": { backgroundImage: "none" } }}
    >
      <Box sx={{ width: "20rem", pl: 2, pb: 5 }} role="presentation">
        <Nav user={user} newMentionsCount={data?.profile?.newMentionsCount} />
      </Box>
    </SwipeableDrawer>
  );
};

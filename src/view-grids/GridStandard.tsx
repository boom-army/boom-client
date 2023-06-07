import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { WhoToFollow } from "../components/SideBar/WhoToFollow";
import { TipRank } from "../components/SideBar/TipRank";
import { headerOffset } from "../utils/boom-web3/constants";

export const GridStandard: React.FC = () => {
  const theme = useTheme();
  const hideWidgets = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container justifyContent="center">
      {!hideWidgets ? (
        <Grid
          item
          md={3}
          display={{ xs: "none", sm: "none", md: "block" }}
          sx={{ height: headerOffset, overflow: "scroll" }}
        >
          <TipRank />
          <WhoToFollow />
        </Grid>
      ) : null}
      <Box
        component={Grid}
        item
        sm={12}
        md={7}
        sx={{
          borderRight: `1px solid ${theme.tertiaryColor}`,
          borderLeft: `1px solid ${theme.tertiaryColor}`,
          "@media screen and (max-width: 530px)": {
            border: 0,
            paddingBottom: "2.5rem",
          },
        }}
      >
        <Outlet />
      </Box>
    </Grid>
  );
};

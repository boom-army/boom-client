import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ChannelFeed } from "../views";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { RoutePath } from "../constants";

export const GridChannel: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid
        item
        md={3}
        display={{ xs: "none", md: "block" }}
        sx={{ background: theme.blue.dark }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h4" p={2}>
            All the good DAO stuff happens here
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sm={12}
        md={5}
        sx={{
          borderRight: `1px solid ${theme.tertiaryColor}`,
          borderLeft: `1px solid ${theme.tertiaryColor}`,
        }}
      >
        <ChannelFeed />
      </Grid>
    </Grid>
  );
};

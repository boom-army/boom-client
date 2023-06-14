import React from "react";
import { ChannelFeed } from "../views";
import { Box, Grid, Typography, useTheme } from "@mui/material";

export const GridChannel: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid container height="100%">
      <Grid
        item
        md={4}
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
            Secret DAO stuff happens here
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
          maxWidth: "100%",
        }}
      >
        <ChannelFeed />
      </Grid>
    </Grid>
  );
};

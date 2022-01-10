import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const CurrentUser = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box mr={1}>
          <Link to="/">
            <Typography variant="h6">Boom β</Typography>
          </Link>
        </Box>
      </Grid>
    </>
  );
};

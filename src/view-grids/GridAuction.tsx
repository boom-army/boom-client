import React, { useContext } from "react";
import { BoomOnes } from "../views";
import { ChannelAuction } from "../views/ChannelAuction";
import { Grid, Paper, useTheme } from "@mui/material";

export const GridAuction: React.FC = () => {
  const theme = useTheme();

  const middleColStyles = {
    borderRight: `1px solid ${theme.tertiaryColor}`,
    borderLeft: `1px solid ${theme.tertiaryColor}`,

    "@media screen and (max-width: 530px)": {
      border: 0,
    },
  };
  return (
    <Grid container>
      <Paper
        component={Grid}
        item
        xs={12}
        sm={12}
        md={6}
        sx={middleColStyles}
        elevation={0}
      >
        <BoomOnes />
      </Paper>
      <Grid item md={6} xs={12} sm={12} sx={middleColStyles}>
        <ChannelAuction />
      </Grid>
    </Grid>
  );
};

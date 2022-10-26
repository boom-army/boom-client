import React, { useContext } from "react";
import { BoomOnes } from "../views";
import { ChannelAuction } from "../views/ChannelAuction";
import { CustomResponse } from "../components/CustomResponse";
import { Grid, Paper } from "@mui/material";
import { ThemeContext } from "../contexts/theme";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export const GridAuction: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const anchorWallet = useAnchorWallet();  

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
        {!anchorWallet?.publicKey && <CustomResponse text={"Connect your Solana wallet to chat."} />}
        {anchorWallet?.publicKey && <ChannelAuction />}
      </Grid>
    </Grid>
  );
};

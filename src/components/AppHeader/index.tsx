import React from "react";
import { CurrentUserBadge } from "../CurrentUserBadge";
import { Link } from "react-router-dom";
import DisconnectIcon from '@material-ui/icons/LinkOff';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hero: {
    flexGrow: 1,
  }
}));

export const AppHeader = () => {
  const { connected, wallet } = useWallet();
  const classes = useStyles();

  const TopBar = (
    <AppBar position="absolute" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters={true}>
          <Link to="/" className={classes.hero}>
            {connected ? <CurrentUserBadge /> : <Typography variant="h6">Sosol</Typography>}
          </Link>
          {wallet && <WalletDisconnectButton startIcon={<DisconnectIcon />} style={{ marginLeft: 8 }} />}
          <WalletMultiButton />
        </Toolbar>
      </Container>
    </AppBar>
  );

  return TopBar;
};

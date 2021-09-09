import React from "react";
import { ConnectButton } from "../ConnectButton";
import { CurrentUserBadge } from "../CurrentUserBadge";
import { Link } from "react-router-dom";
import { Network } from "../Network";
import { useWallet } from "../../contexts/wallet-old";
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
  const { connected } = useWallet();
  const classes = useStyles();

  const TopBar = (
    <AppBar position="absolute" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters={true}>
          <Link to="/" className={classes.hero}>
            {connected ? <CurrentUserBadge /> : <Typography variant="h6">Sosol</Typography>}
          </Link>
          <ConnectButton />
          {process.env.NODE_ENV === "development" ? <Network /> : null}
        </Toolbar>
      </Container>
    </AppBar>
  );

  return TopBar;
};

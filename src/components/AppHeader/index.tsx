import React from "react";
import { CurrentUser } from "../CurrentUser";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/utils";
import { useNativeAccount } from "../../contexts/accounts";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import DisconnectIcon from "@material-ui/icons/LinkOff";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { AppBar, Box, Container, Toolbar, makeStyles } from "@material-ui/core";

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
  },
}));

export const AppHeader = () => {
  const { connected, wallet } = useWallet();
  const { account } = useNativeAccount();
  const classes = useStyles();

  const TopBar = (
    <AppBar position="absolute" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters={true}>
          <Link to="/" className={classes.hero}>
            <CurrentUser connected={connected} />
          </Link>
          {wallet && (
            <>
              <Box mr={1}>
                <p>
                  {formatNumber.format(
                    (account?.lamports || 0) / LAMPORTS_PER_SOL
                  )}{" "}
                  SOL
                </p>
              </Box>
              <WalletDisconnectButton
                startIcon={<DisconnectIcon />}
                style={{ marginLeft: 8 }}
              />
            </>
          )}
          <WalletMultiButton />
        </Toolbar>
      </Container>
    </AppBar>
  );

  return TopBar;
};

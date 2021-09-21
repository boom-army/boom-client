import React from "react";
import { CurrentUser } from "../CurrentUser";
import { formatNumber } from "../../utils/utils";
import { useNativeAccount } from "../../contexts/accounts";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import DisconnectIcon from "@mui/icons-material/LinkOff";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { AppBar, Box, Container, Grid, Toolbar } from "@mui/material";

export const AppHeader = () => {
  const { connected, wallet } = useWallet();
  const { account } = useNativeAccount();

  const TopBar = (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters={true}>
          <CurrentUser connected={connected} />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            {wallet && (
              <>
                <Box mr={1} mb={0.5}>
                  {formatNumber.format(
                    (account?.lamports || 0) / LAMPORTS_PER_SOL
                  )}{" "}
                  SOL
                </Box>
                <Box mr={1}>
                  <WalletDisconnectButton
                    startIcon={<DisconnectIcon />}
                    style={{ marginLeft: 8 }}
                  />
                </Box>
              </>
            )}
            <WalletMultiButton />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );

  return TopBar;
};

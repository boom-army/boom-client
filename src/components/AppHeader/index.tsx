import React, {useCallback, useEffect, useMemo} from "react";
import base58 from "bs58";   
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
import { FEED } from "../../queries/others";
import { USERS } from "../../queries/follow";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../queries/auth";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

export const AppHeader = () => {
  const { connected, wallet, publicKey, signMessage } = useWallet();
  const { account } = useNativeAccount();
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("token");

  const [getNonce] = useMutation(PUBLIC_ADDRESS);
  const [setLogin] = useMutation(LOGIN_REGISTER, {
    refetchQueries: [{ query: FEED }, { query: USERS }],
    onCompleted({ loginRegister }) {
      if (localStorage) {
        localStorage.setItem("token", loginRegister.token);
        localStorage.setItem("user", JSON.stringify(loginRegister.user));
      }
    },
  });

  const walletPublicKey = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const signin = useCallback(async () => {
    if (!walletPublicKey) {
      enqueueSnackbar("Wallet not connected!", { variant: "error" });
      return;
    }

    if (!signMessage) {
      enqueueSnackbar("Wallet does not support message signing!", { variant: "error" });
      return;
    }

    try {
      const { data: { address } } = await getNonce({
        variables: { publicAddress: walletPublicKey },
      });
      if (address.hasPublicAddress) {
        const data = new TextEncoder().encode(address.user.nonce);
        const signature = await signMessage(data);
        
        await setLogin({
          variables: {
            publicAddress: walletPublicKey,
            signature: base58.encode(signature),
          },
        });
        window.location.reload();
        enqueueSnackbar(`Wallet ${walletPublicKey} connected to account. Happy posting.`, { variant: "success" });
      } else {
        await setLogin({ variables: { publicAddress: walletPublicKey } });
        enqueueSnackbar(`Wallet ${walletPublicKey} created for account.`, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(`Error connecting: ${error}`, { variant: "error" });
    }
  }, [signMessage, getNonce, setLogin, walletPublicKey, enqueueSnackbar])

  useEffect(() => {
    if (wallet && !token && connected) signin()
  } , [wallet, signin, token, connected])

  const TopBar = (
    <AppBar
      position="absolute"
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters={true}>
          <CurrentUser />
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

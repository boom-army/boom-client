import React, { useCallback, useEffect, useMemo, useContext } from "react";
// import { LAMPORTS_PER_SOL } from "@solana/web3.js";
// import { formatNumber } from "../../utils/utils";
// import { useNativeAccount } from "../../contexts/accounts";
import base58 from "bs58";
import {
  AppBar,
  Container,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { CurrentUser } from "../CurrentUser";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../queries/auth";
import { USER_FOLLOW } from "../../queries/follow";
import { UserContext } from "../../contexts/user";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "../../contexts/snackbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { FeedDocument } from "../../generated/graphql";
import { Box, padding } from "@mui/system";

export const AppHeader = () => {
  const { connected, wallet, publicKey, signMessage } = useWallet();
  // const { account } = useNativeAccount();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(UserContext);
  const trigger = useScrollTrigger();

  const token = localStorage.getItem("token");

  const [getNonce] = useMutation(PUBLIC_ADDRESS);
  const [setLogin] = useMutation(LOGIN_REGISTER, {
    refetchQueries: [{ query: FeedDocument }, { query: USER_FOLLOW }],
    onCompleted({ loginRegister }) {
      if (localStorage) {
        setUser(loginRegister.user);
        localStorage.setItem("token", loginRegister.token);
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
      enqueueSnackbar("Wallet does not support message signing!", {
        variant: "error",
      });
      return;
    }

    try {
      const {
        data: { address },
      } = await getNonce({
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
        enqueueSnackbar(
          `Wallet ${walletPublicKey} connected to account. Happy posting.`,
          { variant: "success" }
        );
      } else {
        await setLogin({ variables: { publicAddress: walletPublicKey } });
        enqueueSnackbar(`Wallet ${walletPublicKey} created for account.`, {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(`Error connecting: ${error}`, { variant: "error" });
    }
  }, [signMessage, getNonce, setLogin, walletPublicKey, enqueueSnackbar]);

  useEffect(() => {
    if (wallet && !token && connected) signin();
  }, [wallet, signin, token, connected]);

  // const logout = () => {
  //   localStorage.clear();
  //   window.location.replace('/');
  // };

  const TopBar = (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        sx={{
          borderBottom: (t) => `1px solid ${t.palette.divider}`
        }}
      >
        <Toolbar variant="dense">
          <Container maxWidth="lg" disableGutters={true}>
            <Box display="flex">
              <Box sx={{ flexGrow: 1 }}>
                <CurrentUser />
              </Box>
              <Box>
                <WalletMultiButton />
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Slide>
  );

  return TopBar;
};

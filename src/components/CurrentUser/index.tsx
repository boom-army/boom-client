import React, { useMemo, MouseEventHandler, useCallback } from "react";
import base58 from "bs58";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { FEED, USERS } from "../../queries/others";
import { Link } from "react-router-dom";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../queries/auth";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useWallet } from "@solana/wallet-adapter-react";

export const CurrentUser = (props: { connected: boolean }) => {
  const { connected } = props;
  const { wallet, publicKey, signMessage } = useWallet();
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();

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
  const content = useMemo(() => {
    if (!wallet || !walletPublicKey) return null;
    return walletPublicKey.slice(0, 4) + ".." + walletPublicKey.slice(-4);
  }, [wallet, walletPublicKey]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
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
        console.log("wallet connect error:", error);
        enqueueSnackbar(`Error connecting: ${error}`, { variant: "error" });
      }
    },
    [signMessage, getNonce, setLogin, walletPublicKey,enqueueSnackbar]
  );

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
            <Typography variant="h6">Sosol α</Typography>
          </Link>
        </Box>
        {connected && !token && (
          <>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Login with{" "}
              <Avatar sx={{ width: 24, height: 24 }} src={wallet?.icon} />{" "}
              {content}
            </Button>
          </>
        )}
      </Grid>
    </>
  );
};

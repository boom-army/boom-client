import React, { useMemo, MouseEventHandler, useCallback } from "react";
import base58 from "bs58";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { FEED, USERS } from "../../queries/others";
import { Link } from "react-router-dom";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../queries/auth";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useWallet } from "@solana/wallet-adapter-react";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export const CurrentUser = (props: { connected: boolean }) => {
  const { connected } = props;
  const classes = useStyles();
  const { wallet, publicKey, signMessage } = useWallet();
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
  const content = useMemo(() => {
    if (!wallet || !walletPublicKey) return null;
    return walletPublicKey.slice(0, 4) + ".." + walletPublicKey.slice(-4);
  }, [wallet, walletPublicKey]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (!walletPublicKey) {
        toast.error("Wallet not connected!");
        return;
      }
      if (!signMessage) {
        toast.error("Wallet does not support message signing!");
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
          toast.success(
            `Wallet ${walletPublicKey} connected to account. Happy posting.`
          );
        } else {
          await setLogin({ variables: { publicAddress: walletPublicKey } });
          toast.success(`Wallet ${walletPublicKey} created for account.`);
        }
      } catch (error) {
        console.log("wallet connect error:", error);
        toast.error(`Error connecting: ${error}`);
      }
    },
    [signMessage, getNonce, setLogin, walletPublicKey]
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
            <Typography variant="h6">Sosol</Typography>
          </Link>
        </Box>
        {connected && !token && (
          <>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Login with <Avatar src={wallet?.icon} className={classes.small} />{" "}
              {content}
            </Button>
          </>
        )}
      </Grid>
    </>
  );
};

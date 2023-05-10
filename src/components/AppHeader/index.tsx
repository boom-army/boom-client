import {
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import base58 from "bs58";
import {
  AppBar,
  Grid,
  Toolbar,
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
import { Box } from "@mui/system";

export const AppHeader = () => {
  const { connected, wallet, publicKey, signMessage } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(UserContext);

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

  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar variant="dense">
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ flexGrow: 1 }}>
                <CurrentUser />
              </Box>
              <Box mt={0.5}>
                <WalletMultiButton />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

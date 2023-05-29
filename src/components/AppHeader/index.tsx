import { useCallback, useEffect, useMemo, useContext } from "react";
import base58 from "bs58";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { CurrentUser } from "./CurrentUser";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../queries/auth";
import { USER_FOLLOW } from "../../queries/follow";
import { Theme } from "../../contexts/theme";
import { UserContext } from "../../contexts/user";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { useSnackbar } from "../../contexts/snackbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { FeedDocument, useNewMentionsQuery } from "../../generated/graphql";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { RoutePath } from "../../constants";
import { useNewMentions } from "../../hooks";
import { localStorageLogout } from "../../utils";

export const AppHeader = () => {
  const { connected, wallet, publicKey, signMessage } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(UserContext);
  const { setNewMentions } = useNewMentions();

  // const { loading, data, refetch } = useProfileQuery({
  //   variables: { handle: user?.handle },
  // });
  const { data: newMentionsData } = useNewMentionsQuery({
    pollInterval: 30000,
  });

  useEffect(() => {
    setNewMentions(newMentionsData?.newMentions);
  }, [newMentionsData]);

  const token = localStorage.getItem("token");
  const headerImg =
    localStorage.getItem(Theme.TAG) === Theme.LIGHT
      ? "/assets/boom-logo-dark.png"
      : "/assets/boom-logo-light.png";

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
      console.log(address);

      if (address.hasPublicAddress) {
        const data = new TextEncoder().encode(
          `Login to Boom! by using your wallet to sign this message code. This is just a safe, secure way of verifying your identity. It doesn't transfer any funds. CODE: ${address.user.nonce}`
        );
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

  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.background2,
        backgroundImage: "none",
      }}
    >
      <Toolbar variant="dense">
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Box mr={1} display="flex" alignItems="center">
                <Link
                  to={RoutePath.HOME}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src={headerImg} alt="Boom" height={20} />
                </Link>
              </Box>
              <Box mt={0.5}>
                <CurrentUser />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

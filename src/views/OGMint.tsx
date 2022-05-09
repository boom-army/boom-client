import { useEffect, useMemo, useState, useCallback, useContext } from "react";
import * as anchor from "@project-serum/anchor";
import { Container, Snackbar } from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CableIcon from '@mui/icons-material/Cable';
import TwitterIcon from '@mui/icons-material/Twitter';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { PublicKey, PublicKeyInitData } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  CANDY_MACHINE_PROGRAM,
  CandyMachineAccount,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
} from "../utils/candy-machine";
import { AlertState } from "../utils/utils";
import { Header } from "../components/CandyMachine/Header";
import { MintButton } from "../components/CandyMachine/MintButton";
import { GatewayProvider } from "@civic/solana-gateway-react";
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Tilt from "react-parallax-tilt";
import { ThemeContext } from "../contexts/theme";

const ConnectButton = styled(WalletDialogButton)({
  width: "100%",
  height: "60px",
  marginTop: "10px",
  marginBottom: "5px",
  background: "#fd0069",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
});

const TiltStyled = styled(Tilt)({
  backgroundImage: "url(/assets/outer.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "260px",
  height: "260px",
  transformStyle: "preserve-3d",
});

const ThemeListItemText = styled(ListItemText)((props) => ({
  "& p": {
    color: props.theme.secondaryColor,
  },
}));

const MintContainer = styled("div")({}); // add your owns styles here

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID as PublicKeyInitData
    )
  : null;
const txTimeoutInMilliseconds: number = 30000;

export const OGMint = () => {
  const { theme } = useContext(ThemeContext);
  const { connection } = useConnection();
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const rpcUrl = process.env.REACT_APP_RPC_URL;
  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    if (candyMachineId) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          candyMachineId,
          connection
        );
        setCandyMachine(cndy);
      } catch (e) {
        console.log("There was a problem fetching Candy Machine state");
        console.log(e);
      }
    }
  }, [anchorWallet, connection]);

  const onMint = async () => {
    try {
      setIsUserMinting(true);
      document.getElementById("#identity")?.click();

      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintResult = await mintOneToken(candyMachine, wallet.publicKey);

        let status: any = { err: true };
        if (mintResult) {
          status = await awaitTransactionSignatureConfirmation(
            mintResult?.mintTxId,
            txTimeoutInMilliseconds,
            connection,
            true
          );
        }

        if (status && !status.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsUserMinting(false);
    }
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [anchorWallet, connection, refreshCandyMachineState]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2em",
        }}
      >
        <img
          src={"/assets/Boom Heros Season Challenge Mint.png"}
          alt="Boom OG NFT Mint"
          width="500em"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <Box mt={4}>
            <Paper
              style={{
                padding: 24,
                backgroundColor: "#002F46",
                borderRadius: 6,
                border: "3px solid #005078",
              }}
            >
              {!wallet.connected ? (
                <ConnectButton>Connect Wallet</ConnectButton>
              ) : (
                <>
                  <Header candyMachine={candyMachine} />
                  <MintContainer>
                    {candyMachine?.state.isActive &&
                    candyMachine?.state.gatekeeper &&
                    wallet.publicKey &&
                    wallet.signTransaction ? (
                      //@ts-ignore
                      <GatewayProvider
                        wallet={{
                          publicKey:
                            wallet.publicKey ||
                            new PublicKey(CANDY_MACHINE_PROGRAM),
                          //@ts-ignore
                          signTransaction: wallet.signTransaction,
                        }}
                        gatekeeperNetwork={
                          candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                        }
                        clusterUrl={rpcUrl}
                        options={{ autoShowModal: false }}
                      >
                        <MintButton
                          candyMachine={candyMachine}
                          isMinting={isUserMinting}
                          onMint={onMint}
                        />
                      </GatewayProvider>
                    ) : (
                      <MintButton
                        candyMachine={candyMachine}
                        isMinting={isUserMinting}
                        onMint={onMint}
                      />
                    )}
                  </MintContainer>
                </>
              )}
            </Paper>
          </Box>
        </Grid>
        <Grid item sm={5}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <TiltStyled
              className="track-on-window"
              tiltMaxAngleX={30}
              tiltMaxAngleY={30}
              perspective={800}
              transitionSpeed={1500}
              trackOnWindow={true}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "translateZ(30px)",
                  display: "flex",
                }}
              >
                <img
                  src={"/assets/animated-200.gif"}
                  width="160"
                  className="inner-element"
                  alt="Boom Heroes #420"
                />
              </Box>
            </TiltStyled>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography>
          You're about to mint a piece of Solana history - a #BoomHeroes Season
          Challenge Pass that will unlock all future Season Challenges on Boom
          in perpetuity. If you have a White List (WL) token or two lucky you -
          you're obviously an OG 1303! All WL hero...ETHP tokens mint FOR FREE!!
        </Typography>
      </Box>
      <Box mt={4}>
        <img
          src={"/assets/Tips for minting.png"}
          width="180"
          alt="Minting Schedule"
        />
        <Typography mb={1}>
          We're hoping the minting process goes as smoothly as possible. Here's
          some pro-tips to help you out:
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: theme.accentColor }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ThemeListItemText
              primary="How to connect"
              secondary="Use the connect button on the top right in the Nav for full access to
              Boom.Army. You'll have to sign a wallet popup message to verify your Boom.Army account."
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: theme.accentColor }}>
                <CableIcon />
              </Avatar>
            </ListItemAvatar>
            <ThemeListItemText
              primary="Connecting via the mint interface"
              secondary="If you use the connect button in the mint interface, you'll get an error popup. 
              Don't worry about it, it's just letting you know you only have access to mint, but not to post on Boom.Army."
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: theme.accentColor }}>
                <AccountBalanceWalletIcon />
              </Avatar>
            </ListItemAvatar>
            <ThemeListItemText
              primary="Have enough Wallet SOL"
              secondary="Make sure you have enough SOL to pay for TX and Arweave fees especially if you're minting with a WL token. They should be less than 0.02 SOL."
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: theme.accentColor }}>
                <TwitterIcon />
              </Avatar>
            </ListItemAvatar>
            <ThemeListItemText
              primary="Show off your Boom Hero"
              secondary="Once you've minted post your avatar on Boom.Army and Twitter with the #BoomHeroes tag. There'll be an Easter Egg for one lucky poster!"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: theme.accentColor }}>
                <SupportAgentIcon />
              </Avatar>
            </ListItemAvatar>
            <ThemeListItemText
              primary="If all else fails"
              secondary="In the world of Mainnet Beta sometimes things don't always go as planned. We'll be in discord at https://discord.gg/RqbcwKphDr if you need us."
            />
          </ListItem>
        </List>
      </Box>
      <Box mt={4}>
        <img
          src={"/assets/The future of Boom heroes.png"}
          width="300"
          alt="Minting Schedule"
        />
        <Typography mb={1}>
          Aside from looking dope AF Boom has big plans for this NFT. Its the
          first Season Challenge Pass, something we've been talking about for
          several weeks and are currently building out. We want to keep things
          simple for this mint, and we're still ironing out the details for the
          Season Challenges to make them easier to understand. But there's a
          link at the bottom outlining the plan so far, if you're hungry to know
          more.
        </Typography>
        <Typography mb={1} sx={{ color: theme.accentColor }}>
          <a
            href="https://boom.army/docs/docs/prologue/season-challenges/"
            target="_blank"
            rel="noreferrer"
          >
            A full breakdown of the Season Challenges plan to date.
          </a>
        </Typography>
        <Typography mb={1}>HAPPY MINTING FRENS!</Typography>
      </Box>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

import { useEffect, useMemo, useState, useCallback, useContext } from "react";
import * as anchor from "@project-serum/anchor";

import styled from "styled-components";
import { Container, Snackbar } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
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
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Tilt from "react-parallax-tilt";
import { ThemeContext } from "../contexts/theme";

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: #fd0069;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TiltStyled = styled(Tilt)(({ theme }) => ({
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
}));

function createData(serial: string, cost: number, minting: string) {
  return { serial, cost, minting };
}

const MintContainer = styled.div``; // add your owns styles here

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID as PublicKeyInitData
);
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
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
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

  const rows = [
    createData("#1 - 100 | Legendary", 1.303, `Pre-sale: SOLD OUT`),
    createData("#101 - 250 | Ultra Rare", 1.6, `LOCKED`),
    createData("#251 - 500 | Rare", 2, "LOCKED"),
    createData("#501 - 750 | Rare", 2.3, "SELLING NOW"),
    createData("#751 - 1000 | Regular", 2.5, "CM Loaded"),
    createData("#1001 - 1303 | Regular", 3, "CM Loaded"),
  ];

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
        <img src={"/assets/boom-og.png"} alt="Boom OG NFT Mint" width="300em" />
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
                  src={"/assets/inner.png"}
                  width="120"
                  className="inner-element"
                  alt="1303 OG NFT Card"
                />
              </Box>
            </TiltStyled>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography>
          To commemorate the official launch of Boom.Army Beta, we're launching
          1303 OG NFTs for everyone who is early. There are 1303 NFTs available,
          and they will receive a 1303 split share of 20% of our Market Place
          fees in perpetuity. All White List i3o3...3bos tokens mint at 1.303
          SOL discount.
        </Typography>
      </Box>
      <Box mt={4}>
        <img src={"/assets/minting.png"} width="184" alt="Minting Schedule" />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: "none" }}>
                  <Typography
                    sx={{ color: theme.secondaryColor, fontSize: "8px" }}
                    variant="body2"
                  >
                    Serial
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: "none" }} align="right">
                  <Typography
                    variant="body2"
                    sx={{ color: theme.secondaryColor, fontSize: "10px" }}
                  >
                    Cost (SOL)
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: "none" }} align="right">
                  <Typography
                    sx={{ color: theme.secondaryColor, fontSize: "10px" }}
                    variant="body2"
                  >
                    Minting (EST)
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.serial}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ borderBottom: "1px solid #0071AA" }}
                    component="th"
                    scope="row"
                  >
                    <Typography sx={{ color: theme.primaryColor }}>
                      {row.serial}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #0071AA" }}
                    align="right"
                  >
                    <Typography sx={{ color: theme.primaryColor }}>
                      {row.cost}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #0071AA" }}
                    align="right"
                  >
                    <Typography sx={{ color: theme.primaryColor }}>
                      {row.minting}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

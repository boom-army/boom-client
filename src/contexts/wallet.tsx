import React, { FC, useCallback, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletError } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { currentCluster } from "../utils/utils";
import { useSnackbar } from "./snackbar";

require("@solana/wallet-adapter-react-ui/styles.css");

export const Wallet: FC<{children: JSX.Element}> = ({ children = null }) => {
  const endpoint = process.env.REACT_APP_RPC_URL!;  
  let { name } = currentCluster();

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: name }),
    ],
    [name]
  );

  const { enqueueSnackbar } = useSnackbar();

  const onError = useCallback((error: WalletError) => {
    const message = error.message ? `${error.name}: ${error.message}` : error.name;
    enqueueSnackbar(message, { variant: 'error' });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletDialogProvider title={<>Login with Solana Wallet</>}>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

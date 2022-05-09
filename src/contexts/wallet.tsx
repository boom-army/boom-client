import React, { FC, useCallback, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
  GlowWalletAdapter,
  // LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  // SolletExtensionWalletAdapter,
  // SolletWalletAdapter,
  // TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { TriggerSnack } from "../components/Snackbar";

require("@solana/wallet-adapter-react-ui/styles.css");

export const Wallet: FC<{children: JSX.Element}> = ({ children = null }) => {
  const endpoint = process.env.REACT_APP_RPC_URL as string;
  let network = WalletAdapterNetwork.Devnet;

  switch (process.env.REACT_APP_RPC_URL) {
    case "https://api.devnet.solana.com":
      network = WalletAdapterNetwork.Devnet;
      break;
    case "https://api.testnet.solana.com":
      network = WalletAdapterNetwork.Testnet;
      break;
    default:
      network = WalletAdapterNetwork.Mainnet;
      break;
  }

  // @solana/wallet-adapter-wallets imports all the adapters but supports tree shaking --
  // Only the wallets you want to support will be compiled into your application
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      // new TorusWalletAdapter(),
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    <TriggerSnack
      message={error.message ? `${error.name}: ${error.message}` : error.name}
      severity="error"
      openSnack={true}
    />;
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

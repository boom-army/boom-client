import React, { FC, useCallback, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletError } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
  // getLedgerWallet,
  getPhantomWallet,
  // getSlopeWallet,
  getSolflareWallet,
  // getSolletWallet,
  // getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { useSnackbar } from "notistack";

export const Wallet: FC = ({ children = null as any }) => {
  const endpoint = process.env.REACT_APP_RPC_URL as string;

  // @solana/wallet-adapter-wallets imports all the adapters but supports tree shaking --
  // Only the wallets you want to support will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      // getSlopeWallet(),
      // getTorusWallet({
      //   options: {
      //     clientId:
      //       "BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ",
      //   },
      // }),
      // getLedgerWallet(),
      // getSolletWallet({ network }),
    ],
    [/*network*/]
  );

  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
    (error: WalletError) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: "error" }
      );
      console.error(error);
    },
    [enqueueSnackbar]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

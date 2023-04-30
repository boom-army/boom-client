import { FC, useCallback, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletError } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  ExodusWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { currentCluster } from "../utils/utils";
import { useSnackbar } from "./snackbar";
import { UmiProvider } from "./umi";
import { MetaplexProvider } from "./metaplex";

export const Wallet: FC<{ children: JSX.Element }> = ({ children = null }) => {
  const { name, endpoint } = currentCluster();

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter({ network: name }),
      new BraveWalletAdapter(),
      new TorusWalletAdapter(),
      new ExodusWalletAdapter({ network: name }),
    ],
    [name]
  );

  const { enqueueSnackbar } = useSnackbar();

  const onError = useCallback((error: WalletError) => {
    const message = error.message
      ? `${error.name}: ${error.message}`
      : error.name;
    enqueueSnackbar(message, { variant: "error" });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <MetaplexProvider>
          <UmiProvider endpoint={endpoint}>
            <WalletDialogProvider title={<>Login with Solana Wallet</>}>
              {children}
            </WalletDialogProvider>
          </UmiProvider>
        </MetaplexProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

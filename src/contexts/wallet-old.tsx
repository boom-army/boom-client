import React, { useContext, useEffect, useMemo, useState } from "react";
import EventEmitter from "eventemitter3";
import Wallet from "@project-serum/sol-wallet-adapter";
import type { PublicKey } from "@solana/web3.js";
// import { LedgerWalletAdapter } from "../wallet-adapters/ledger";
// import { PhantomWalletAdapter } from "../wallet-adapters/phantom";
// import { SolongWalletAdapter } from "../wallet-adapters/solong";
import { Transaction } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import { useConnectionConfig } from "./connection";
import { useLocalStorageState } from "../utils/utils";
import { useMutation } from "@apollo/client";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../queries/auth";
import base58 from "bs58";

const ASSETS_URL =
  "https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/";
export const WALLET_PROVIDERS = [
  {
    name: "Sollet",
    url: "https://www.sollet.io",
    icon: `${ASSETS_URL}sollet.svg`,
  },
  // {
  //   name: "Solong",
  //   url: "https://solongwallet.com",
  //   icon: `${ASSETS_URL}solong.png`,
  //   adapter: SolongWalletAdapter,
  // },
  {
    name: "Solflare",
    url: "https://solflare.com/access-wallet",
    icon: `${ASSETS_URL}solflare.svg`,
  },
  {
    name: "MathWallet",
    url: "https://mathwallet.org",
    icon: `${ASSETS_URL}mathwallet.svg`,
  },
  // {
  //   name: "Ledger",
  //   url: "https://www.ledger.com",
  //   icon: `${ASSETS_URL}ledger.svg`,
  //   adapter: LedgerWalletAdapter,
  // },
  // {
  //   name: "Phantom",
  //   url: "https://phantom.app/",
  //   icon: `https://raydium.io/_nuxt/img/phantom.d9e3c61.png`,
  //   adapter: PhantomWalletAdapter,
  // },
];

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  sign: (
    message: Uint8Array,
    display: unknown
  ) => Promise<{ signature: Buffer; publicKey: PublicKey }>;
  connect: () => any;
  disconnect: () => any;
}

const WalletContext = React.createContext<{
  wallet: WalletAdapter | undefined;
  connected: boolean;
  provider: typeof WALLET_PROVIDERS[number] | undefined;
  setProviderUrl: any;
}>({
  wallet: undefined,
  connected: false,
  provider: undefined,
  setProviderUrl: () => {},
});

export function WalletProvider({ children = null as any }) {
  const { endpoint } = useConnectionConfig();

  const [autoConnect, setAutoConnect] = useState(false);
  const [providerUrl, setProviderUrl] = useLocalStorageState("walletProvider");

  const [getNonce] = useMutation(PUBLIC_ADDRESS);
  const [setLogin] = useMutation(LOGIN_REGISTER, {
    onCompleted({ loginRegister }) {
      if (localStorage) {
        localStorage.setItem("token", loginRegister.token);
        localStorage.setItem("user", JSON.stringify(loginRegister.user));
      }
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const provider = useMemo(
    () => WALLET_PROVIDERS.find(({ url }) => url === providerUrl),
    [providerUrl]
  );

  const wallet = useMemo(
    function () {
      if (provider) {
        return new /*provider.adapter ||  */ Wallet(
          providerUrl,
          endpoint
        ) as WalletAdapter;
      }
    },
    [provider, providerUrl, endpoint]
  );

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (wallet) {
      wallet.on("connect", async () => {
        if (wallet.publicKey) {
          const walletPublicKey = wallet.publicKey.toBase58();
          const keyToDisplay =
            walletPublicKey.length > 20
              ? `${walletPublicKey.substring(
                  0,
                  7
                )}....${walletPublicKey.substring(
                  walletPublicKey.length - 7,
                  walletPublicKey.length
                )}`
              : walletPublicKey;

          try {
            const {
              data: { address },
            } = await getNonce({
              variables: { publicAddress: walletPublicKey },
            });
            if (address.hasPublicAddress) {
              const data = new TextEncoder().encode(address.user.nonce);
              const signed = await wallet.sign(data, "utf8");
              await setLogin({
                variables: {
                  publicAddress: walletPublicKey,
                  signature: base58.encode(signed.signature),
                },
              });
              enqueueSnackbar(
                `Wallet ${keyToDisplay} connected to account. Happy posting.`
              );
            } else {
              await setLogin({ variables: { publicAddress: walletPublicKey } });
              enqueueSnackbar(`Wallet ${keyToDisplay} created for account.`);
            }
            setConnected(true);
          } catch (error) {
            console.log("wallet connect error:", error);
            enqueueSnackbar(`Error connecting: ${error}`);
            wallet.disconnect();
          }
        }
      });

      wallet.on("disconnect", () => {
        setConnected(false);
        // localStorage.clear();
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 2100);
        enqueueSnackbar(`Disconnected from wallet`);
      });
    }

    return () => {
      setConnected(false);
      if (wallet) {
        wallet.disconnect();
      }
    };
  }, [wallet, getNonce, setLogin,enqueueSnackbar]);

  useEffect(() => {
    if (wallet && autoConnect) {
      wallet.connect();
      setAutoConnect(false);
    }

    return () => {};
  }, [wallet, autoConnect]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        provider,
        setProviderUrl,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const { wallet, connected, provider, setProviderUrl } =
    useContext(WalletContext);
  return {
    wallet,
    connected,
    provider,
    setProviderUrl,
    publicKey: wallet?.publicKey,
    connect() {
      wallet?.connect();
    },
    disconnect() {
      wallet?.disconnect();
    },
  };
}

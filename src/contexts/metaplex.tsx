import {
  Metaplex,
  bundlrStorage,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, ReactNode } from "react";

export const MetaplexContext = createContext<Metaplex | null>(null);

export const MetaplexProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage());

  return (
    <MetaplexContext.Provider value={metaplex}>
      {children}
    </MetaplexContext.Provider>
  );
};

// Custom hook for accessing the Metaplex context data
export const useMetaplex = () => {
  const context = useContext(MetaplexContext);
  if (context === undefined) {
    throw new Error("useMetaplex must be used within a MetaplexProvider");
  }
  return context;
};

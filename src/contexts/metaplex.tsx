import { Metaplex } from "@metaplex-foundation/js";
import { useConnection } from "@solana/wallet-adapter-react";
import { createContext, useContext, ReactNode } from "react";

export const MetaplexContext = createContext<Metaplex | null>(null);

export const MetaplexProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);

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

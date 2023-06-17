import { PublicKey } from "@solana/web3.js";

export const BOOM_CHANNEL_ID = "cl20tx15a3168501mk7k79w0qs";
export const BOOM_CHANNEL_NAME = "boom-army";
export const BOOM_COLLECTION_MINT_PUBLIC_KEY =
  "EJqr8VRC3rJaEVDDkcbG9G122ixW1GQ4f6y6vMwaGoco";

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
export let TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export let LENDING_PROGRAM_ID = new PublicKey(
  "TokenLending1111111111111111111111111111111"
);

export let SWAP_PROGRAM_ID = new PublicKey(
  "SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8"
);

export let SOSOL_TOKEN_ID = new PublicKey(
  "boomh1LQnwDnHtKxWTFgxcbdRjPypRSjdwxkAEJkFSH"
);

export let METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export let SOSOL_HOST_ID = new PublicKey(
  "hostdMqCRk7o6Lwg1tP7JtmvWBBM5UR6zwbuMA7oeq2"
);

export const PROGRAM_IDS = [
  {
    name: "mainnet-beta",
  },
  {
    name: "testnet",
  },
  {
    name: "devnet",
  },
  {
    name: "localnet",
  },
];

export const setProgramIds = (envName: string) => {
  let instance = PROGRAM_IDS.find((env) => env.name === envName);
  if (!instance) {
    return;
  }
};

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
  };
};

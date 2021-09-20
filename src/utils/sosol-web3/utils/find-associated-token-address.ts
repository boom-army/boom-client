import {
  PublicKey, PublicKeyInitData
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

const SOSOL_MINT: PublicKey = new PublicKey(
  process.env.REACT_APP_SOSOL_MINT as PublicKeyInitData
);

export const findAssociatedTokenAddress = async (
  walletAddress: PublicKey,
  tokenMintAddress = SOSOL_MINT
): Promise<PublicKey> =>
  (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
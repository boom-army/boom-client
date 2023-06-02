import { Connection, PublicKey } from "@solana/web3.js";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

/**
 * Checks is a user has an NFT from a given collection in their wallet
 * @param userAddress USER_PUBLIC_KEY
 * @param collectionMintAddress COLLECTION_MINT_PUBLIC_KEY
 * @returns Boolean
 */
export const userOwnsNFT = async (
  userAddress: string,
  collectionMintAddress: string,
  connection: Connection
): Promise<boolean> => {
  const userPublicKey = new PublicKey(userAddress);
  const collectionMintPublicKey = new PublicKey(collectionMintAddress);

  const userTokenAccountAddress = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    collectionMintPublicKey,
    userPublicKey
  );

  const userTokenAccountInfo = await connection.getAccountInfo(
    userTokenAccountAddress
  );

  return userTokenAccountInfo !== null;
};

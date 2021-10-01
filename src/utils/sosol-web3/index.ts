import { web3, BN, Program, Provider } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  PublicKeyInitData,
  PublicKey,
  Connection,
  TransactionSignature,
} from "@solana/web3.js";
import { idl } from "./sosol";

const SOSOL_MINT: PublicKey = new PublicKey(
  process.env.REACT_APP_SOSOL_MINT as PublicKeyInitData
);

export const loadAnchor = async (wallet: AnchorWallet, setProgram: any) => {
  const programId = new PublicKey(
    process.env.REACT_APP_PROGRAM_ID as PublicKeyInitData
  );
  const connection = new Connection(process.env.REACT_APP_RPC_URL as string, {
    commitment: "processed",
  });
  const provider = new Provider(connection, wallet, {
    commitment: "processed",
  });

  const newProgram = new Program(idl, programId, provider);

  // console.log(newProgram, "Is Anchor Working?");
  setProgram(newProgram);
};

const findAssociatedTokenAddress = async (
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
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

/**
 * Executes an on-chain interaction
 * @param program sosol program derived from loadAnchor()
 * @param consumerTokenAcc token account of the consumer/payer
 * @param creatorTokenAcc token account of the content creator
 * @param storageTokenAcc token account of the content storage hosting provider
 * @param consumerAcc the wallet/account of the consumer/payer
 * @param interactionFee the fee to charge 100000000 = 1 sosol
 */
export const interactionInstruction = async (
  connection: Connection,
  program: Program,
  consumerAcc: PublicKey,
  creatorAcc: String,
  storageAcc: String,
  interactionFee: any
): Promise<TransactionSignature> => {
  const creator = new web3.PublicKey(creatorAcc);
  const storage = new web3.PublicKey(storageAcc);

  const consumerTokenAcc = await findAssociatedTokenAddress(
    consumerAcc,
    SOSOL_MINT
  );
  const consumerTokenAccBalance = await connection.getTokenAccountBalance(consumerTokenAcc);
  if (consumerTokenAccBalance?.value?.amount < interactionFee) throw new Error("Not enough $sosol for this transaction");

  const creatorTokenAcc = await findAssociatedTokenAddress(creator, SOSOL_MINT);
  const storageTokenAcc = await findAssociatedTokenAddress(storage, SOSOL_MINT);

  if (!program.provider)
    throw new Error("Program provider missing - try again");

  return await program.rpc.interaction(new BN(interactionFee), {
    accounts: {
      from: consumerTokenAcc,
      to: creatorTokenAcc,
      toStorageAccount: storageTokenAcc,
      owner: consumerAcc,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });
};

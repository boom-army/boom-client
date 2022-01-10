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
import { ERRORS } from "./constants";

const SOSOL_MINT: PublicKey = new PublicKey(
  process.env.REACT_APP_SOSOL_MINT as PublicKeyInitData
);

export const loadAnchor = async (wallet: AnchorWallet) => {
  const programId = new PublicKey(
    process.env.REACT_APP_PROGRAM_ID as PublicKeyInitData
  );
  const connection = new Connection(process.env.REACT_APP_RPC_URL as string, {
    commitment: "processed",
  });
  const provider = new Provider(connection, wallet, {
    commitment: "processed",
  });

  return new Program(idl, programId, provider);
};

const findAssociatedTokenAddress = async (
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> => {
  try {
    return (
      await PublicKey.findProgramAddress(
        [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    )[0];
  } catch (err) {
    throw new Error(`${ERRORS.NO_SSL_ACCOUNT} ${walletAddress}`);
  }
};

const getTokenAccountBalance = async (
  connection: Connection,
  acc: PublicKey
) => {
  try {
    return await connection.getTokenAccountBalance(acc);
  } catch (err) {
    throw new Error(ERRORS.NO_SSL);
  }
};

const assertSufficientTokens = async (
  connection: Connection,
  consumerTokenAcc: PublicKey,
  required: any
) => {
  const consumerTokenAccBalance = await getTokenAccountBalance(
    connection,
    consumerTokenAcc
  );

  if (consumerTokenAccBalance?.value?.amount < required)
    throw new Error(ERRORS.INSUFFICIENT_SSL);
};

const assertProgramProvider = (program: Program) => {
  if (!program.provider) throw new Error(ERRORS.MISSING_PROGRAM_PROVIDER);
};

/**
 * Executes an on-chain interaction
 * @param program sosol program derived from loadAnchor()
 * @param consumerTokenAcc token account of the consumer/payer
 * @param creatorTokenAcc token account of the content creator
 * @param storageTokenAcc token account of the content storage hosting provider
 * @param consumerAcc the wallet/account of the consumer/payer
 * @param interactionFee the fee to charge 100000000 = 1 BMA
 */
export const interactionInstruction = async (
  connection: Connection,
  program: Program,
  consumerAcc: PublicKey,
  creatorAcc: String,
  storageAcc: String,
  interactionFee: any
): Promise<TransactionSignature> => {
  const consumerTokenAcc = await findAssociatedTokenAddress(
    consumerAcc,
    SOSOL_MINT
  );

  const creator = new web3.PublicKey(creatorAcc);
  const storage = new web3.PublicKey(storageAcc);

  const [, creatorTokenAcc, storageTokenAcc] = await Promise.all([
    assertSufficientTokens(connection, consumerTokenAcc, interactionFee),
    findAssociatedTokenAddress(creator, SOSOL_MINT),
    findAssociatedTokenAddress(storage, SOSOL_MINT),
  ]);

  assertProgramProvider(program);

  try {
    return await program.rpc.interaction(new BN(interactionFee), {
      accounts: {
        from: consumerTokenAcc,
        to: creatorTokenAcc,
        toStorageAccount: storageTokenAcc,
        owner: consumerAcc,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  } catch (err) {
    throw new Error(ERRORS.GENERIC_CONTRACT_INTERACTION);
  }
};

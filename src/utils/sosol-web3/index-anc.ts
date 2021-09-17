import { web3, BN, Program } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKeyInitData, PublicKey } from "@solana/web3.js";
import { idl } from "./sosol";

const SOSOL_MINT: PublicKey = new PublicKey(
  process.env.REACT_APP_SOSOL_MINT as PublicKeyInitData
);

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
 * @param consumerTokenAcc token account of the consumer/payer
 * @param creatorTokenAcc token account of the content creator
 * @param storageTokenAcc token account of the content storage hosting provider
 * @param consumerAcc the wallet/account of the consumer/payer
 * @param interactionFee the fee to charge 100000000 = 1 sosol
 */
export const interactionInstruction = async (
  consumerAcc: PublicKey,
  creatorAcc: String,
  storageAcc: String,
  interactionFee: any
) => {  
  const programId = new web3.PublicKey(
    process.env.REACT_APP_PROGRAM_ID as PublicKeyInitData
  );  
  const program = new Program(idl, programId);
  console.log('***************', programId.toBase58());

  const creator = new web3.PublicKey(creatorAcc);
  const storage = new web3.PublicKey(storageAcc);

  console.log("1:", consumerAcc, creator, storage);

  const consumerTokenAcc = await findAssociatedTokenAddress(
    consumerAcc,
    SOSOL_MINT
  );
  const creatorTokenAcc = await findAssociatedTokenAddress(creator, SOSOL_MINT);
  const storageTokenAcc = await findAssociatedTokenAddress(storage, SOSOL_MINT);

  console.log( "2:", consumerTokenAcc.toBase58(), creatorTokenAcc.toBase58(), storageTokenAcc.toBase58() );

  // await program.rpc.interaction(new BN(interactionFee), {
  //   accounts: {
  //     from: consumerTokenAcc,
  //     to: creatorTokenAcc,
  //     toStorageAccount: storageTokenAcc,
  //     owner: consumerAcc,
  //     tokenProgram: TOKEN_PROGRAM_ID,
  //   },
  // });
};

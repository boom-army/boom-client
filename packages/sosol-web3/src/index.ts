import { Address, web3, BN, Program } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import fs from "fs";

/**
 * Executes an on-chain interaction
 * @param consumerTokenAcc token account of the consumer/payer
 * @param creatorTokenAcc token account of the content creator
 * @param storageTokenAcc token account of the content storage hosting provider
 * @param consumerAcc the wallet/account of the consumer/payer
 * @param interactionFee the fee to charge 100000000 = 1 sosol
 */
export const interactionInstruction = async (
  consumerTokenAcc: Address,
  creatorTokenAcc: Address,
  storageTokenAcc: Address,
  consumerAcc: Address,
  interactionFee: any
) => {
  const idl = JSON.parse(fs.readFileSync("src/sosol.json", "utf8"));
  const programId = new web3.PublicKey(
    "GUc7rVpFLGrnyFAodiYpFPBVHjL8ZbMudESGJAPC5MPs"
  );
  const program = new Program(idl, programId);

  await program.rpc.interaction(new BN(interactionFee), {
    accounts: {
      from: consumerTokenAcc,
      to: creatorTokenAcc,
      toStorageAccount: storageTokenAcc,
      owner: consumerAcc,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });
};

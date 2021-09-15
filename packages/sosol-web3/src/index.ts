import anchor, { Address } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import fs from "fs";

export const interactionInstruction = async (
  consumerTokenAcc: Address,
  creatorTokenAcc: Address,
  storageTokenAcc: Address,
  consumerAcc: Address,
  interactionFee: any
) => {
  const idl = JSON.parse(fs.readFileSync("./sosol.json", "utf8"));
  const programId = new anchor.web3.PublicKey(
    "CQrhjjHtMrTnGGBSWbJaHESnUBqx7X3t9vfM6LqKqG9R"
  );
  const program = new anchor.Program(idl, programId);

  await program.rpc.interaction(new anchor.BN(interactionFee), {
    accounts: {
      from: consumerTokenAcc,
      to: creatorTokenAcc,
      toStorageAccount: storageTokenAcc,
      owner: consumerAcc,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });
};

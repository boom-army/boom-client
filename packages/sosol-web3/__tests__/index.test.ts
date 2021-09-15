import fs from 'fs';
import { createTokenAccount } from "@project-serum/common";
import { Address, web3, Program } from "@project-serum/anchor";
import { interactionInstruction } from "../src";

describe("sosol-tests", () => {
  let mint = new web3.PublicKey(
    "soso1vCmdxwEZqU47M4NZ4MxZH19ppgqF1auG7dP3wz"
  );
  let consumerAcc = new web3.PublicKey(
    "CtjoSnmJHWuJiemKxpbFM1hb9CkMGBXEKDHmdoqmhh4z"
  );
  let consumerTokenAcc = new web3.PublicKey(
    "DAGnJEaRqVVVrKCX2Su1z5e1ywVznjhqUSkGr2w9JRN4"
  );
  let creatorAcc = web3.Keypair.generate();
  let creatorTokenAcc: Address = "";
  let storageAcc = web3.Keypair.generate();
  let storageTokenAcc: Address = "";

  const idl = JSON.parse(
    fs.readFileSync("src/sosol.json", "utf8")
  );
  const programId = new web3.PublicKey(
    "8Ea7iXE3UstZTtH8EfkvQRSHsn2KF76Z3wx4kbdtqrjN"
  );
  const program = new Program(idl, programId);

  beforeAll(async () => {
    creatorTokenAcc = await createTokenAccount(
      program.provider,
      mint,
      creatorAcc.publicKey
    );

    storageTokenAcc = await createTokenAccount(
      program.provider,
      mint,
      storageAcc.publicKey
    );
  });

  test("Actions an interaction", async () => {
    const INTERACTION_FEE = 10000000;

    // console.log('*************', {
    //   from: god.toBase58(),
    //   to: creatorTokenAcc.toBase58(),
    //   toStorageAccount: storageTokenAcc.toBase58(),
    //   tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
    //   programId: program.programId.toBase58(),
    // });

    await interactionInstruction(
      consumerTokenAcc,
      creatorTokenAcc,
      storageTokenAcc,
      consumerAcc,
      INTERACTION_FEE
    );

    // assert.ok(checkAccount.from.equals(god));
    // assert.ok(checkAccount.to.equals(receiver));
    // assert.ok(checkAccount.interactionFee.eq(new anchor.BN(INTERACTION_FEE)));
    // assert.ok(checkAccount.owner.equals(program.provider.wallet.publicKey));

    // let toAccount = await serumCmn.getTokenAccount(
    //   program.provider,
    //   creatorTokenAcc
    // );
    // assert.ok(toAccount.amount.eq(new anchor.BN(INTERACTION_FEE)));
  });
});

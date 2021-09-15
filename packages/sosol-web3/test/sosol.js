import { interactionInstruction } from "../src";

const anchor = require("@project-serum/anchor");
const serumCmn = require("@project-serum/common");

describe("sosol-tests", () => {
  let mint = new anchor.web3.PublicKey(
    "soso1vCmdxwEZqU47M4NZ4MxZH19ppgqF1auG7dP3wz"
  );
  let consumerAcc = new anchor.web3.PublicKey(
    "CtjoSnmJHWuJiemKxpbFM1hb9CkMGBXEKDHmdoqmhh4z"
  );
  let consumerTokenAcc = new anchor.web3.PublicKey(
    "DAGnJEaRqVVVrKCX2Su1z5e1ywVznjhqUSkGr2w9JRN4"
  );
  let creatorAcc = anchor.web3.Keypair.generate();
  let creatorTokenAcc = null;
  let storageAcc = anchor.web3.Keypair.generate();
  let storageTokenAcc = null;

  const idl = JSON.parse(
    require("fs").readFileSync("../src/sosol.json", "utf8")
  );
  const programId = new anchor.web3.PublicKey(
    "8Ea7iXE3UstZTtH8EfkvQRSHsn2KF76Z3wx4kbdtqrjN"
  );
  const program = new anchor.Program(idl, programId);

  it("Sets up initial test state", async () => {
    creatorTokenAcc = await serumCmn.createTokenAccount(
      program.provider,
      mint,
      creatorAcc.publicKey
    );

    storageTokenAcc = await serumCmn.createTokenAccount(
      program.provider,
      mint,
      storageAcc.publicKey
    );
  });

  it("Actions an interaction", async () => {
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

import fs from 'fs';
import { createTokenAccount } from "@project-serum/common";
import { Address, web3, Program } from "@project-serum/anchor";
import { interactionInstruction } from "../src";

require('dotenv').config();

describe("sosol-tests", () => {
  let mint = new web3.PublicKey(process.env.MINT_KEY as string);
  let consumerAcc = new web3.PublicKey(process.env.CONSUMER_ACC as string);
  let consumerTokenAcc = new web3.PublicKey(process.env.CONSUMER_TOKEN_ACC as string);
  let creatorAcc = web3.Keypair.generate();
  let creatorTokenAcc: Address = "";
  let storageAcc = web3.Keypair.generate();
  let storageTokenAcc: Address = "";

  const idl = JSON.parse(
    fs.readFileSync("src/sosol.json", "utf8")
  );
  const programId = new web3.PublicKey(process.env.PROGRAM_ID as string);
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
    const INTERACTION_FEE = 1000000000; // 1 token

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

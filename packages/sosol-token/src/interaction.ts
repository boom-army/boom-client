import * as BufferLayout from "buffer-layout";
import * as Layout from "./utils/layout";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
  Transaction,
} from "@solana/web3.js";
import { Numberu64, sendAndConfirmTransaction } from "./utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const URL = process.env.RPC_URL || "http://localhost:8899";
const SOSOL_PROGRAM_ID = new PublicKey(
  "namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX"
);

let connection: Connection;
const getConnection = async(): Promise<Connection> => {
  if (connection) return connection;

  connection = new Connection(URL, "recent");
  const version = await connection.getVersion();

  console.log("Connection to cluster established:", URL, version);
  return connection;
}

export const exeInteraction = async (
  fromTokenAcc: PublicKey,
  creatorTokenAcc: PublicKey,
  storageTokenAcc: PublicKey,
  ownerWallet: Keypair,
  interactionFee: Numberu64
) => {
  connection = await getConnection();
  const transaction = new Transaction();
  const fromOwnerAcc = ownerWallet.publicKey;
  const instruction = interactionInstruction(
    fromTokenAcc,
    creatorTokenAcc,
    storageTokenAcc,
    TOKEN_PROGRAM_ID,
    fromOwnerAcc,
    interactionFee
  );
  transaction.add(instruction);
  await sendAndConfirmTransaction(
    "interaction",
    connection,
    transaction,
    ownerWallet
  );
};

export const interactionInstruction = (
  fromTokenAcc: PublicKey,
  creatorTokenAcc: PublicKey,
  storageTokenAcc: PublicKey,
  tokenProgram = TOKEN_PROGRAM_ID,
  fromOwnerAcc: PublicKey,
  interactionFee: Numberu64
): TransactionInstruction => {
  const dataLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Layout.uint64("interactionFee"),
  ]);

  const data = Buffer.alloc(dataLayout.span);

  dataLayout.encode(
    {
      instruction: 1, // Interaction instruction
      interactionFee: new Numberu64(interactionFee).toBuffer(),
    },
    data
  );

  const keys = [
    {
      pubkey: fromTokenAcc,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: creatorTokenAcc,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: storageTokenAcc,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: tokenProgram,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: fromOwnerAcc,
      isSigner: true,
      isWritable: false,
    },
  ];

  return new TransactionInstruction({
    keys,
    programId: SOSOL_PROGRAM_ID,
    data,
  });
};

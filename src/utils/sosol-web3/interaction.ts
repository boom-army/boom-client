import * as BufferLayout from "buffer-layout";
import * as Layout from "./utils";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
  Transaction,
} from "@solana/web3.js";
import {
  Numberu64,
  sendAndConfirmTransaction,
  findAssociatedTokenAddress,
} from "./utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const URL = process.env.RPC_URL || "http://localhost:8899";
const SOSOL_PROGRAM_ID = new PublicKey(
  "8Ea7iXE3UstZTtH8EfkvQRSHsn2KF76Z3wx4kbdtqrjN"
);

let connection: Connection;
const getConnection = async (): Promise<Connection> => {
  if (connection) return connection;

  connection = new Connection(URL, "recent");
  const version = await connection.getVersion();

  console.log("Connection to cluster established:", URL, version);
  return connection;
};

export const interactionInstruction = async (
  fromAcc: PublicKey,
  creatorAcc: PublicKey,
  storageAcc: PublicKey,
  interactionFee: Numberu64
): Promise<TransactionInstruction> => {
  let fromTokenAcc, creatorTokenAcc, storageTokenAcc;
  try {
    fromTokenAcc = await findAssociatedTokenAddress(fromAcc);
    creatorTokenAcc = await findAssociatedTokenAddress(creatorAcc);
    storageTokenAcc = await findAssociatedTokenAddress(storageAcc);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }

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
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: fromAcc,
      isSigner: true,
      isWritable: false,
    },
  ];

  console.log({ keys, programId: SOSOL_PROGRAM_ID, data });

  return new TransactionInstruction({
    keys,
    programId: SOSOL_PROGRAM_ID,
    data,
  });
};

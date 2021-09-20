import * as BufferLayout from "buffer-layout";
import * as Layout from "./utils";
import {
  PublicKey,
  TransactionInstruction,
  PublicKeyInitData
} from "@solana/web3.js";
import { Numberu64, findAssociatedTokenAddress } from "./utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const SOSOL_PROGRAM_ID = new PublicKey(process.env.REACT_APP_PROGRAM_ID as PublicKeyInitData);
const SOSOL_MINT: PublicKey = new PublicKey(process.env.REACT_APP_SOSOL_MINT as PublicKeyInitData);

export const interactionInstruction = async (
  fromAcc: PublicKey,
  creatorAcc: PublicKey,
  storageAcc: PublicKey,
  interactionFee: Numberu64
): Promise<TransactionInstruction> => {
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

  const consumerTokenAcc = await findAssociatedTokenAddress(fromAcc, SOSOL_MINT );
  const creatorTokenAcc = await findAssociatedTokenAddress(creatorAcc, SOSOL_MINT);
  const storageTokenAcc = await findAssociatedTokenAddress(storageAcc, SOSOL_MINT);

  const keys = [
    {
      pubkey: consumerTokenAcc,
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

  return new TransactionInstruction({
    keys,
    programId: SOSOL_PROGRAM_ID,
    data,
  });
};

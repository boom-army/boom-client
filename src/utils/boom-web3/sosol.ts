// TODO: This should be JSON
import { Idl } from "@coral-xyz/anchor";

export const idl: Idl = {
  version: "0.0.0",
  name: "sosol",
  instructions: [
    {
      name: "interaction",
      accounts: [
        {
          name: "from",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toStorageAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "interactionFee",
          type: "u64",
        },
      ],
    },
  ],
  errors: [
    {
      code: 300,
      name: "NotEnoughTokens",
      msg: "The token account doesn't have enough funds to make this transaction.",
    },
  ],
};

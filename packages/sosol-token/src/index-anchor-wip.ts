import anchor, { Program, Idl, Address, Provider } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const interactionInstruction = async (consumerTokenAcc: Address, creatorTokenAcc: Address, storageTokenAcc: Address, interactionFee: any) => {
  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.Provider.env());
  const idlAccount = {
    name: 'owner',
    isMut: true,
    isSigner: true
  };
  const idlInstruction = {
    name: 'interaction',
    accounts: IdlAccountItem[];
    args: IdlField[];
  };
  const IDL: Idl = {
    version: '1.0',
    name: 'interaction',
    instructions: ['interaction'];
  };
  const PROGRAM_ID: Address = '111';
  const PROVIDER: Provider = '';

  const program = new Program(IDL, PROGRAM_ID, PROVIDER);

  await program.rpc.interaction(new anchor.BN(interactionFee), {
    accounts: {
      from: consumerTokenAcc,
      to: creatorTokenAcc,
      toStorageAccount: storageTokenAcc,
      owner: program.provider.wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
    }
  });
};

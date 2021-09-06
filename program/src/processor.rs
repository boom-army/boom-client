//! Program state processor
use {
    crate::error::SosolError,
    crate::instruction::SosolInstruction,
    // crate::program_id::id as p_id,
    crate::token_id::id as t_id,
    solana_program::{
        account_info::{next_account_info, AccountInfo},
        entrypoint::ProgramResult,
        msg,
        program::invoke,
        program_error::ProgramError,
        pubkey::Pubkey,
    },
    spl_token::instruction::transfer
};

/// Program state handler.
pub struct Processor {}
impl Processor {
    /// Derives the associated token account address for the given wallet address and token mint
    pub fn process_consume(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        interaction_fee: u64,
        storage_percent_fee: u8,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let consumer_acc = next_account_info(account_info_iter)?;
        let token_transfer_authority = next_account_info(account_info_iter)?;
        let consumer_token_acc = next_account_info(account_info_iter)?;
        let creator_acc = next_account_info(account_info_iter)?;
        let storage_acc = next_account_info(account_info_iter)?;
        let token_acc = next_account_info(account_info_iter)?;
        let token_program_acc = next_account_info(account_info_iter)?;

        if !consumer_acc.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        if !token_transfer_authority.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        if *token_acc.key != t_id() {
            return Err(SosolError::IncorrectTokenProgramId.into());
        }

        msg!(
            "program_id: {}, consumer_acc: {}, consumer_token_acc: {}, token_transfer_authority: {}, creator_account_key: {}, interaction_fee: {}, storage_account_key: {}, storage_percent_fee: {})",
            program_id,
            consumer_acc.key,
            consumer_token_acc.key,
            token_transfer_authority.key,
            creator_acc.key,
            interaction_fee,
            storage_acc.key,
            storage_percent_fee,
        );

        // check_account_owner(consumer_transfer_acc, &program_id)?;

        // 1 - check balance against interaction_fee

        // 3 - split payment using storage_percent_fee

        // 2 - pay to creator_account_key
        msg!("Calling the token program to transfer tokens to the content creator...");
        token_transfer(
            token_program_acc.clone(),
            creator_acc.clone(),
            consumer_acc.clone(),
            token_transfer_authority.clone(),
            interaction_fee,
        )?;

        // 4 - if has storage_percent_fee -> pay to storage_account_key

        // 6 - clean up / delete accounts

        Ok(())
    }

    /// Generic processor to trigger match on instruction_data
    pub fn process_instruction(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        msg!("Beginning processing");
        let instruction = SosolInstruction::unpack(instruction_data)?;
        msg!("Instruction unpacked");

        match instruction {
            SosolInstruction::Consume {
                interaction_fee,
                storage_percent_fee,
            } => {
                msg!("Instruction: Consume");
                Self::process_consume(program_id, accounts, interaction_fee, storage_percent_fee)?;
            }
        }
        Ok(())
    }
}

/// Check account owner is the given program
fn check_account_owner(account_info: &AccountInfo, program_id: &Pubkey) -> Result<(), SosolError> {
    if *program_id != *account_info.owner {
        msg!(
            "Expected account to be owned by program {}, received {}",
            program_id,
            account_info.owner
        );
        Err(SosolError::IncorrectProgramId)
    } else {
        Ok(())
    }
}

/// Issue a spl_token `Transfer` instruction.
#[allow(clippy::too_many_arguments)]
fn token_transfer<'a>(
    token_program: AccountInfo<'a>,
    source: AccountInfo<'a>,
    destination: AccountInfo<'a>,
    authority: AccountInfo<'a>,
    amount: u64,
) -> Result<(), ProgramError> {
    let ix = transfer(
        token_program.key,
        source.key,
        destination.key,
        authority.key,
        &[],
        amount,
    )?;
    invoke(&ix, &[source, destination, authority, token_program])
}

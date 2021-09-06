//! Instruction processor
use {
    crate::error::SosolError,
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::{msg, program_error::ProgramError},
    std::convert::TryInto,
};

/// Instructions supported by the generic sosol program
#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub enum SosolInstruction {
    /// Create an consume transaction
    ///
    /// Accounts expected by this instruction:
    /// 0. `[signer]` consumer_acc: the public key of the consumer interacting with the content
    /// 1. `[writable]` consumer_transfer_acc: the public key of the consumer interacting with the content
    /// 2. `[]` creator_acc: the public key of the creator of the content
    /// 3. `[]` storage_acc: the public key of the storage host of the content
    /// 4. `[]` token_acc: the public key of the token
    /// 5. `[]` token_program_acc: the public key of the token program
    Consume {
        /// The amount ($SOC) that will be charged for the content consumption
        interaction_fee: u64,
        /// The storage hosts commision percentage
        storage_percent_fee: u8,
    },
}

// Heavily borrowed from solana-program-library/token/program/src/instruction.rs

impl SosolInstruction {
    /// Unpacks a byte buffer into a [SosolInstruction](enum.SosolInstruction.html).
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        use SosolError::InvalidInstruction;

        let (&tag, rest) = input.split_first().ok_or(InvalidInstruction)?;
        Ok(match tag {
            0 => {
                let (interaction_fee, rest) = Self::unpack_u64(rest)?;
                let (storage_percent_fee, _rest) = Self::unpack_u8(rest)?;
                Self::Consume {
                    interaction_fee,
                    storage_percent_fee,
                }
            }

            _ => return Err(SosolError::InvalidInstruction.into()),
        })
    }

    // fn unpack_pubkey(input: &[u8]) -> Result<(Pubkey, &[u8]), ProgramError> {
    //     if input.len() >= 32 {
    //         let (key, rest) = input.split_at(32);
    //         let pk = Pubkey::new(key);
    //         Ok((pk, rest))
    //     } else {
    //         Err(SosolError::InvalidInstruction.into())
    //     }
    // }

    // fn unpack_pubkey_option(input: &[u8]) -> Result<(COption<Pubkey>, &[u8]), ProgramError> {
    //     match input.split_first() {
    //         Option::Some((&0, rest)) => Ok((COption::None, rest)),
    //         Option::Some((&1, rest)) if rest.len() >= 32 => {
    //             let (key, rest) = rest.split_at(32);
    //             let pk = Pubkey::new(key);
    //             Ok((COption::Some(pk), rest))
    //         }
    //         _ => Err(SosolError::InvalidInstruction.into()),
    //     }
    // }

    fn unpack_u64(input: &[u8]) -> Result<(u64, &[u8]), ProgramError> {
        if input.len() < 8 {
            msg!("u64 cannot be unpacked");
            return Err(SosolError::InstructionUnpackError.into());
        }
        let (bytes, rest) = input.split_at(8);
        let value = bytes
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(SosolError::InstructionUnpackError)?;
        Ok((value, rest))
    }

    fn unpack_u8(input: &[u8]) -> Result<(u8, &[u8]), ProgramError> {
        if input.is_empty() {
            msg!("u8 cannot be unpacked");
            return Err(SosolError::InstructionUnpackError.into());
        }
        let (bytes, rest) = input.split_at(1);
        let value = bytes
            .get(..1)
            .and_then(|slice| slice.try_into().ok())
            .map(u8::from_le_bytes)
            .ok_or(SosolError::InstructionUnpackError)?;
        Ok((value, rest))
    }
}

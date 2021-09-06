//! Error types
use {
    num_derive::FromPrimitive,
    solana_program::{
        decode_error::DecodeError,
        msg,
        program_error::{PrintProgramError, ProgramError},
    },
    thiserror::Error,
};

/// Errors that may be returned by the Sosol program.
#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum SosolError {
    /// App is out of space
    #[error("Out of space")]
    OutOfSpace,
    /// Invalid instruction
    #[error("Invalid instruction")]
    InvalidInstruction,
    /// Invalid instruction data passed in.
    #[error("Failed to unpack instruction data")]
    InstructionUnpackError,
    /// The account provided doesn't match the program id.
    #[error("The account did not have the expected program id")]
    IncorrectProgramId,
    /// The provided token program does not match the token program expected by the swap
    #[error("The provided token program does not match the Sosol token program")]
    IncorrectTokenProgramId,
}

impl From<SosolError> for ProgramError {
    fn from(e: SosolError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
impl<T> DecodeError<T> for SosolError {
    fn type_of() -> &'static str {
        "SosolError"
    }
}

impl PrintProgramError for SosolError {
    fn print<E>(&self) {
        msg!("SOSOL-ERROR: {}", &self.to_string());
    }
}

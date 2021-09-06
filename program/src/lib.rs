#![deny(missing_docs)]
#![forbid(unsafe_code)]

//! Sosol is a token that gives utility to social media built on Solana

pub mod error;
pub mod instruction;
pub mod processor;

#[cfg(not(feature = "no-entrypoint"))]
mod entrypoint;

mod program_id {
  use solana_program::declare_id;
  declare_id!("8DqELvN5TFeMtNJciUYvGqso2CyG5M6XNWxh3HRr3Vjv");
}

mod token_id {
  use solana_program::declare_id;
  declare_id!("4qH751PJLxuaZmspt77XNsViw2uNDPJhE5XUfXxYXFCX");
}

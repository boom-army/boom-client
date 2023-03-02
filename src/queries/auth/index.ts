import gql from "graphql-tag";

export const PUBLIC_ADDRESS = gql`
  mutation address($publicAddress: String!) {
    address(publicAddress: $publicAddress) {
      hasPublicAddress
      user {
        id
        nonce
        publicAddress
      }
    }
  }
`;

export const LOGIN_REGISTER = gql`
  mutation loginRegister($publicAddress: String!, $signature: String) {
    loginRegister(publicAddress: $publicAddress, signature: $signature) {
      token
      user {
        id
        handle
        publicAddress
        avatar
        data {
          avatarMint
          avatarUpdateAuthority
        }
      }
    }
  }
`;

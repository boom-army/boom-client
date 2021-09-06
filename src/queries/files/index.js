import gql from "graphql-tag";

export const SIGN_FILE = gql`
  mutation signFileUrl($file: String!, $type: String!) {
    signFileUrl(file: $file, type: $type)
  }
`;

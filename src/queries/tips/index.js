import gql from "graphql-tag";

export const TIP_CREATOR = gql`
  mutation tipCreator($tipAmount: Int!, $tweetId: String!, $userId: String!) {
    tipCreator(tipAmount: $tipAmount, tweetId: $tweetId, userId: $userId) {
      id
    }
  }
`

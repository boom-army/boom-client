import gql from "graphql-tag";

export const SEARCH_BY_USER = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      id
      handle
      consumerName
      avatar
      followingCount
      followersCount
      tweetsCount
      isFollowing
      isSelf
    }
  }
`;

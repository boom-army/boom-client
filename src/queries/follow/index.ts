import gql from "graphql-tag";

export const FOLLOW = gql`
  mutation follow($id: ID!) {
    follow(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($id: ID!) {
    unfollow(id: $id)
  }
`;

export const USERS = gql`
  query users($offset: Int, $limit: Int, $filter: String) {
    users(offset: $offset, limit: $limit, filter: $filter) {
      id
      handle
      isFollowing
      isSelf
      consumerName
      avatar
      data {
        avatarMint
        avatarUpdateAuthority
      }
      coverPhoto
      bio
    }
  }
`;

export const USER_FOLLOW = gql`
  query userFollow($offset: Int, $limit: Int) {
    userFollow(offset: $offset, limit: $limit) {
      id
      handle
      avatar
      data {
        avatarMint
        avatarUpdateAuthority
      }
      isFollowing
      isSelf
      consumerName
      bio
    }
  }
`;

import gql from "graphql-tag";

export const SEARCH_BY_USER = gql`
  query searchByUser($term: String!) {
    searchByUser(term: $term) {
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

export const SEARCH_BY_TAG = gql`
  query searchByTag($term: String!) {
    searchByTag(term: $term) {
      id
      text
      tags
      isRetweet
      isTweetMine
      retweetsCount
      commentsCount
      files {
        id
        url
      }
      user {
        id
        handle
        publicAddress
        avatar
        consumerName
      }
      createdAt
    }
  }
`;

export const SEARCH_BY_TWEET = gql`
  query searchByTweet($term: String!) {
    searchByTweet(term: $term) {
      id
      text
      tags
      isRetweet
      isTweetMine
      retweetsCount
      commentsCount
      reactions {
        id
        emojiId
        skin
        isMine
        count
      }
      files {
        id
        url
      }
      user {
        id
        handle
        publicAddress
        avatar
        consumerName
      }
      createdAt
    }
  }
`;

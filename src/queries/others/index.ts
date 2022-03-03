import gql from "graphql-tag";

export const FEED = gql`
  query feed($offset: Int!, $limit: Int, $global: Boolean) {
    feed(offset: $offset, limit: $limit, global: $global) {
      id
      text
      tags
      isTweetMine
      commentsCount
      retweetsCount
      isRetweet
      tipsCount
      createdAt
      parentTweet {
        id
      }
      files {
        id
        url
      }
      user {
        id
        publicAddress
        avatar
        handle
        consumerName
      }
      reactions {
        id
        emojiId
        skin
        isMine
        count
      }
    }
  }
`;

export const HEALTH = gql`
  query healthCheck {
    healthCheck
  }
`;

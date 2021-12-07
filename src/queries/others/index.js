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

export const MENTIONS = gql`
  query mention {
    mentions {
      id
      text
      tags
      isTweetMine
      commentsCount
      retweetsCount
      isRetweet
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
        avatar
        publicAddress
        handle
        consumerName
      }
      createdAt
    }
  }
`;

export const HEALTH = gql`
  query healthCheck {
    healthCheck
  }
`;

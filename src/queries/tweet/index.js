import gql from "graphql-tag";

export const NEW_TWEET = gql`
  mutation newTweet($text: String!, $files: [String!]!, $tags: [String!]!, $mentions: [String!]!) {
    newTweet(text: $text, files: $files, tags: $tags, mentions: $mentions) {
      id
      text
      tags
      mentions
      commentsCount
      createdAt
    }
  }
`;

export const DELETE_TWEET = gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
    }
  }
`;

export const TOGGLE_RETWEET = gql`
  mutation toggleRetweet($id: ID!) {
    toggleRetweet(id: $id)
  }
`;

export const TOGGLE_REACTION = gql`
  mutation toggleReaction($id: ID!, $emojiId: String!, $skin: Int) {
    toggleReaction(id: $id, emojiId: $emojiId, skin: $skin)
  }
`;

export const TWEET = gql`
  query tweet($id: ID!) {
    tweet(id: $id) {
      id
      text
      tags
      mentions
      user {
        id
        publicAddress
        fullname
        handle
        avatar
      }
      files {
        id
        url
      }
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
      comments {
        id
        text
        isCommentMine
        user {
          id
          fullname
          handle
          avatar
        }
        createdAt
      }
      createdAt
    }
  }
`;

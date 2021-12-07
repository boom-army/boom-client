import gql from "graphql-tag";

export const NEW_TWEET = gql`
  mutation newTweet(
    $text: String!
    $files: [String!]!
    $tags: [String!]!
    $mentions: [String!]!
    $gif: GifInput
    $nft: NFTInput
    $parentTweet: String
  ) {
    newTweet(
      text: $text
      files: $files
      tags: $tags
      mentions: $mentions
      gif: $gif
      nft: $nft
      parentTweet: $parentTweet
    ) {
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

const tweetFragment = gql`
  fragment User_user on User {
    firstName
    lastName
  }
`

export const TWEET = gql`
  query tweet($id: ID!) {
    tweet(id: $id) {
      id
      text
      tags
      mentions
      parentTweet {
        id
      }
      childTweets {
        id
        text
      }
      user {
        id
        publicAddress
        consumerName
        handle
        avatar
      }
      files {
        id
        url
      }
      gif {
        id
        title
        fixedHeightUrl
        originalUrl
      }
      nft {
        id
        publicKey
        name
        symbol
        description
        sellerFeeBasisPoints
        externalUrl
        image
        attributes {
          traitType
          value
        }
        collection {
          name
          family
        }
        properties {
          files {
            uri
            type
          }
          category
          creators {
            address
            share
          }
        }
      }
      retweetsCount
      isRetweet
      reactions {
        id
        emojiId
        skin
        isMine
        count
      }
      createdAt
    }
  }
`;

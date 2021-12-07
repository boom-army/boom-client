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

const TWEET_FRAGMENT = gql`
  fragment subTweet on Tweet {
    id
    text
    tags
    mentions
    retweetsCount
    isRetweet
    createdAt
    parentTweet {
      id
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
    reactions {
      id
      emojiId
      skin
      isMine
      count
    }
  }
`;

export const TWEET = gql`
  query tweet($id: ID!) {
    tweet(id: $id) {
      ...subTweet
      childTweets {
        ...subTweet
        childTweets {
          ...subTweet
        }
      }
    }
  }
  ${TWEET_FRAGMENT}
`;

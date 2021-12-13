import gql from "graphql-tag";

export const PROFILE = gql`
  query profile($handle: String!, ) {
    profile(handle: $handle) {
      id
      publicAddress
      handle
      consumerName
      consumerName
      avatar
      coverPhoto
      dob
      location
      website
      isSelf
      isFollowing
      followersCount
      followingCount
      tweetsCount
      newMentionsCount
      bio
      tweets {
        id
        text
        tags
        isTweetMine
        user {
          id
          consumerName
          publicAddress
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
        reactions {
          id
          emojiId
          skin
          isMine
          count
        }
        commentsCount
        retweetsCount
        isRetweet
        createdAt
      }
      createdAt
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $handle: String
    $consumerName: String
    $location: String
    $dob: String
    $bio: String
    $website: String
    $avatar: String
    $coverPhoto: String
  ) {
    editProfile(
      handle: $handle
      consumerName: $consumerName
      location: $location
      dob: $dob
      bio: $bio
      website: $website
      avatar: $avatar
      coverPhoto: $coverPhoto
    ) {
      id
      handle
      publicAddress
    }
  }
`;

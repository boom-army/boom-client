import gql from "graphql-tag";

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

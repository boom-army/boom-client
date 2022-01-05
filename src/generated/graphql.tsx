import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AttributesEntity = {
  __typename?: 'AttributesEntity';
  traitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AttributesEntityInput = {
  traitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Collection = {
  __typename?: 'Collection';
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CollectionInput = {
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCommentMine: Scalars['Boolean'];
  text: Scalars['String'];
  tweet?: Maybe<Tweet>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreatorsEntity = {
  __typename?: 'CreatorsEntity';
  address?: Maybe<Scalars['String']>;
  share?: Maybe<Scalars['Int']>;
};

export type CreatorsEntityInput = {
  address?: Maybe<Scalars['String']>;
  share?: Maybe<Scalars['Int']>;
};

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  tweet?: Maybe<Tweet>;
  url: Scalars['String'];
  user?: Maybe<User>;
};

export type FilesEntity = {
  __typename?: 'FilesEntity';
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type FilesEntityInput = {
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type Gif = {
  __typename?: 'Gif';
  fixedHeightUrl: Scalars['String'];
  id: Scalars['ID'];
  originalUrl: Scalars['String'];
  title: Scalars['String'];
  tweet?: Maybe<Tweet>;
};

export type GifInput = {
  fixedHeightUrl: Scalars['String'];
  originalUrl: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  address: Nonce;
  deleteComment: Comment;
  deleteTweet?: Maybe<Tweet>;
  editProfile: User;
  follow: Scalars['Boolean'];
  loginRegister: AuthPayload;
  newTweet: Tweet;
  signFileUrl: Scalars['String'];
  tipCreator: Tip;
  toggleReaction: Scalars['Boolean'];
  toggleRetweet: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
  updateTweet?: Maybe<Tweet>;
};


export type MutationAddCommentArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationAddressArgs = {
  publicAddress: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTweetArgs = {
  id: Scalars['ID'];
};


export type MutationEditProfileArgs = {
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  consumerName?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationFollowArgs = {
  id: Scalars['ID'];
};


export type MutationLoginRegisterArgs = {
  publicAddress: Scalars['String'];
  signature?: Maybe<Scalars['String']>;
};


export type MutationNewTweetArgs = {
  files?: Maybe<Array<Scalars['String']>>;
  gif?: Maybe<GifInput>;
  mentions?: Maybe<Array<Scalars['String']>>;
  nft?: Maybe<NftInput>;
  parentTweet?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  text: Scalars['String'];
};


export type MutationSignFileUrlArgs = {
  bucket?: Maybe<Scalars['String']>;
  file: Scalars['String'];
  type: Scalars['String'];
};


export type MutationTipCreatorArgs = {
  tipAmount: Scalars['String'];
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationToggleReactionArgs = {
  emojiId: Scalars['String'];
  id: Scalars['ID'];
  skin?: Maybe<Scalars['Int']>;
};


export type MutationToggleRetweetArgs = {
  id: Scalars['ID'];
};


export type MutationUnfollowArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTweetArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type Nft = {
  __typename?: 'NFT';
  attributes?: Maybe<Array<Maybe<AttributesEntity>>>;
  collection?: Maybe<Collection>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<Properties>;
  publicKey: Scalars['String'];
  sellerFeeBasisPoints?: Maybe<Scalars['Int']>;
  symbol?: Maybe<Scalars['String']>;
};

export type NftInput = {
  attributes?: Maybe<Array<Maybe<AttributesEntityInput>>>;
  collection?: Maybe<CollectionInput>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<PropertiesInput>;
  publicKey: Scalars['String'];
  sellerFeeBasisPoints?: Maybe<Scalars['Int']>;
  symbol?: Maybe<Scalars['String']>;
};

export type Nonce = {
  __typename?: 'Nonce';
  hasPublicAddress: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type OneSignal = {
  __typename?: 'OneSignal';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  oneSignalId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type OneSignalInput = {
  oneSignalId: Scalars['String'];
};

export type Properties = {
  __typename?: 'Properties';
  category?: Maybe<Scalars['String']>;
  creators?: Maybe<Array<Maybe<CreatorsEntity>>>;
  files?: Maybe<Array<Maybe<FilesEntity>>>;
};

export type PropertiesInput = {
  category?: Maybe<Scalars['String']>;
  creators?: Maybe<Array<Maybe<CreatorsEntityInput>>>;
  files?: Maybe<Array<Maybe<FilesEntityInput>>>;
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Tweet>;
  healthCheck: Scalars['String'];
  me: User;
  mentions: Array<Tweet>;
  oneSignal: OneSignal;
  profile: User;
  profileById: User;
  searchByTag: Array<Tweet>;
  searchByTweet: Array<Tweet>;
  searchByUser: Array<User>;
  tweet: Tweet;
  userFollow: Array<User>;
  users: Array<User>;
};


export type QueryFeedArgs = {
  global?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryOneSignalArgs = {
  oneSignalId: Scalars['String'];
};


export type QueryProfileArgs = {
  handle: Scalars['String'];
};


export type QueryProfileByIdArgs = {
  id: Scalars['String'];
};


export type QuerySearchByTagArgs = {
  term: Scalars['String'];
};


export type QuerySearchByTweetArgs = {
  term: Scalars['String'];
};


export type QuerySearchByUserArgs = {
  term: Scalars['String'];
};


export type QueryTweetArgs = {
  id: Scalars['ID'];
};


export type QueryUserFollowArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  filter?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Reaction = {
  __typename?: 'Reaction';
  count: Scalars['Int'];
  emojiId: Scalars['String'];
  id: Scalars['ID'];
  isMine: Scalars['Boolean'];
  skin?: Maybe<Scalars['Int']>;
  tweet?: Maybe<Tweet>;
  user?: Maybe<User>;
};

export type Retweet = {
  __typename?: 'Retweet';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  tweet?: Maybe<Tweet>;
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
};

export type Tip = {
  __typename?: 'Tip';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tipAmount: Scalars['String'];
  tweetId: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type TipInput = {
  tipAmount: Scalars['String'];
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};

export type Tweet = {
  __typename?: 'Tweet';
  childTweets?: Maybe<Array<Maybe<Tweet>>>;
  comments: Array<Comment>;
  commentsCount: Scalars['Int'];
  createdAt?: Maybe<Scalars['String']>;
  files: Array<File>;
  gif?: Maybe<Gif>;
  id: Scalars['ID'];
  isRetweet: Scalars['Boolean'];
  isTweetMine: Scalars['Boolean'];
  mentions?: Maybe<Array<Scalars['String']>>;
  nft?: Maybe<Nft>;
  parentTweet?: Maybe<Tweet>;
  reactions: Array<Reaction>;
  retweets: Array<Retweet>;
  retweetsCount: Scalars['Int'];
  tags: Array<Scalars['String']>;
  text: Scalars['String'];
  tipsCount?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  consumerName?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  files: Array<File>;
  followers: Array<User>;
  followersCount: Scalars['Int'];
  following: Array<User>;
  followingCount: Scalars['Int'];
  handle: Scalars['String'];
  id: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
  isSelf: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  newMentionsCount: Scalars['Int'];
  nonce: Scalars['String'];
  publicAddress: Scalars['String'];
  reactions: Array<Reaction>;
  retweets: Array<Retweet>;
  tweets: Array<Tweet>;
  tweetsCount: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type FeedQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  global?: Maybe<Scalars['Boolean']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null | undefined, createdAt?: string | null | undefined, parentTweet?: { __typename?: 'Tweet', id: string } | null | undefined, files: Array<{ __typename?: 'File', id: string, url: string }>, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null | undefined, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null | undefined, symbol?: string | null | undefined, description?: string | null | undefined, sellerFeeBasisPoints?: number | null | undefined, externalUrl?: string | null | undefined, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined, collection?: { __typename?: 'Collection', name?: string | null | undefined, family?: string | null | undefined } | null | undefined, properties?: { __typename?: 'Properties', category?: string | null | undefined, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null | undefined, type?: string | null | undefined } | null | undefined> | null | undefined, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null | undefined, share?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, publicAddress: string, avatar?: string | null | undefined, handle: string, consumerName?: string | null | undefined } | null | undefined, reactions: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null | undefined, isMine: boolean, count: number }> }> };

export type OneSignalQueryVariables = Exact<{
  oneSignalId: Scalars['String'];
}>;


export type OneSignalQuery = { __typename?: 'Query', oneSignal: { __typename?: 'OneSignal', id: string, oneSignalId?: string | null | undefined, user?: { __typename?: 'User', id: string } | null | undefined } };

export type ProfileQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, publicAddress: string, handle: string, consumerName?: string | null | undefined, avatar?: string | null | undefined, coverPhoto?: string | null | undefined, dob?: string | null | undefined, location?: string | null | undefined, website?: string | null | undefined, isSelf: boolean, isFollowing: boolean, followersCount: number, followingCount: number, tweetsCount: number, newMentionsCount: number, bio?: string | null | undefined, createdAt?: string | null | undefined, tweets: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null | undefined, createdAt?: string | null | undefined, user?: { __typename?: 'User', id: string, consumerName?: string | null | undefined, publicAddress: string, handle: string, avatar?: string | null | undefined } | null | undefined, files: Array<{ __typename?: 'File', id: string, url: string }>, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null | undefined, reactions: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null | undefined, isMine: boolean, count: number }> }> } };

export type EditProfileMutationVariables = Exact<{
  handle?: Maybe<Scalars['String']>;
  consumerName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['String']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'User', id: string, handle: string, publicAddress: string } };

export type TipCreatorMutationVariables = Exact<{
  tipAmount: Scalars['String'];
  tweetId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type TipCreatorMutation = { __typename?: 'Mutation', tipCreator: { __typename?: 'Tip', id: string } };


export const FeedDocument = gql`
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

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      global: // value for 'global'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const OneSignalDocument = gql`
    query oneSignal($oneSignalId: String!) {
  oneSignal(oneSignalId: $oneSignalId) {
    id
    user {
      id
    }
    oneSignalId
  }
}
    `;

/**
 * __useOneSignalQuery__
 *
 * To run a query within a React component, call `useOneSignalQuery` and pass it any options that fit your needs.
 * When your component renders, `useOneSignalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOneSignalQuery({
 *   variables: {
 *      oneSignalId: // value for 'oneSignalId'
 *   },
 * });
 */
export function useOneSignalQuery(baseOptions: Apollo.QueryHookOptions<OneSignalQuery, OneSignalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OneSignalQuery, OneSignalQueryVariables>(OneSignalDocument, options);
      }
export function useOneSignalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OneSignalQuery, OneSignalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OneSignalQuery, OneSignalQueryVariables>(OneSignalDocument, options);
        }
export type OneSignalQueryHookResult = ReturnType<typeof useOneSignalQuery>;
export type OneSignalLazyQueryHookResult = ReturnType<typeof useOneSignalLazyQuery>;
export type OneSignalQueryResult = Apollo.QueryResult<OneSignalQuery, OneSignalQueryVariables>;
export const ProfileDocument = gql`
    query profile($handle: String!) {
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
      tipsCount
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($handle: String, $consumerName: String, $location: String, $dob: String, $bio: String, $website: String, $avatar: String, $coverPhoto: String) {
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
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      handle: // value for 'handle'
 *      consumerName: // value for 'consumerName'
 *      location: // value for 'location'
 *      dob: // value for 'dob'
 *      bio: // value for 'bio'
 *      website: // value for 'website'
 *      avatar: // value for 'avatar'
 *      coverPhoto: // value for 'coverPhoto'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const TipCreatorDocument = gql`
    mutation tipCreator($tipAmount: String!, $tweetId: String!, $userId: String!) {
  tipCreator(tipAmount: $tipAmount, tweetId: $tweetId, userId: $userId) {
    id
  }
}
    `;
export type TipCreatorMutationFn = Apollo.MutationFunction<TipCreatorMutation, TipCreatorMutationVariables>;

/**
 * __useTipCreatorMutation__
 *
 * To run a mutation, you first call `useTipCreatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTipCreatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tipCreatorMutation, { data, loading, error }] = useTipCreatorMutation({
 *   variables: {
 *      tipAmount: // value for 'tipAmount'
 *      tweetId: // value for 'tweetId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTipCreatorMutation(baseOptions?: Apollo.MutationHookOptions<TipCreatorMutation, TipCreatorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TipCreatorMutation, TipCreatorMutationVariables>(TipCreatorDocument, options);
      }
export type TipCreatorMutationHookResult = ReturnType<typeof useTipCreatorMutation>;
export type TipCreatorMutationResult = Apollo.MutationResult<TipCreatorMutation>;
export type TipCreatorMutationOptions = Apollo.BaseMutationOptions<TipCreatorMutation, TipCreatorMutationVariables>;
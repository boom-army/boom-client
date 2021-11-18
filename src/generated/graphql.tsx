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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
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

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  tweet?: Maybe<Tweet>;
  url: Scalars['String'];
  user?: Maybe<User>;
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
  mentions?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  text: Scalars['String'];
};


export type MutationSignFileUrlArgs = {
  file: Scalars['String'];
  type: Scalars['String'];
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

export type Nonce = {
  __typename?: 'Nonce';
  hasPublicAddress: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Tweet>;
  healthCheck: Scalars['String'];
  me: User;
  mentions: Array<Tweet>;
  profile: User;
  searchByTag: Array<Tweet>;
  searchByTweet: Array<Tweet>;
  searchByUser: Array<User>;
  tweet: Tweet;
  userFollow: Array<User>;
  users: Array<User>;
};


export type QueryFeedArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryProfileArgs = {
  handle: Scalars['String'];
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

export type Tweet = {
  __typename?: 'Tweet';
  comments: Array<Comment>;
  commentsCount: Scalars['Int'];
  createdAt?: Maybe<Scalars['String']>;
  files: Array<File>;
  id: Scalars['ID'];
  isRetweet: Scalars['Boolean'];
  isTweetMine: Scalars['Boolean'];
  mentions?: Maybe<Array<Scalars['String']>>;
  reactions: Array<Reaction>;
  retweets: Array<Retweet>;
  retweetsCount: Scalars['Int'];
  tags: Array<Scalars['String']>;
  text: Scalars['String'];
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
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, createdAt?: string | null | undefined, files: Array<{ __typename?: 'File', id: string, url: string }>, user?: { __typename?: 'User', id: string, publicAddress: string, avatar?: string | null | undefined, handle: string, consumerName?: string | null | undefined } | null | undefined, reactions: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null | undefined, isMine: boolean, count: number }> }> };


export const FeedDocument = gql`
    query feed($offset: Int!, $limit: Int) {
  feed(offset: $offset, limit: $limit) {
    id
    text
    tags
    isTweetMine
    commentsCount
    retweetsCount
    isRetweet
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
    createdAt
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
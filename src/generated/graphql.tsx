import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  traitType?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Channel = {
  __typename?: 'Channel';
  channelParentId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  family: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  membersCount?: Maybe<MembersCount>;
  mintAuthority: Scalars['String'];
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type ChannelInput = {
  channelParentId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  family: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  mintAuthority: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type Collection = {
  __typename?: 'Collection';
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CollectionInput = {
  family?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

export type Common = {
  __typename?: 'Common';
  emojiId?: Maybe<Scalars['String']>;
  emojiUserId?: Maybe<Scalars['String']>;
};

export type CreatorsEntity = {
  __typename?: 'CreatorsEntity';
  address?: Maybe<Scalars['String']>;
  share?: Maybe<Scalars['Int']>;
};

export type CreatorsEntityInput = {
  address?: InputMaybe<Scalars['String']>;
  share?: InputMaybe<Scalars['Int']>;
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
  type?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
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

export type MembersCount = {
  __typename?: 'MembersCount';
  avatars?: Maybe<Array<Maybe<Scalars['String']>>>;
  count?: Maybe<Scalars['Int']>;
};

export type Mention = {
  __typename?: 'Mention';
  common?: Maybe<Common>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tweet?: Maybe<Tweet>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export enum MetaMediaType {
  Link = 'link',
  Photo = 'photo',
  Rich = 'rich',
  Video = 'video'
}

export type MetaOgArticle = {
  __typename?: 'MetaOGArticle';
  author?: Maybe<Scalars['String']>;
  expiration_time?: Maybe<Scalars['String']>;
  modified_time?: Maybe<Scalars['String']>;
  published_time?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MetaOgImages = {
  __typename?: 'MetaOGImages';
  height?: Maybe<Scalars['Int']>;
  secure_url?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type MetaOgVideos = {
  __typename?: 'MetaOGVideos';
  height?: Maybe<Scalars['Int']>;
  stream?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type MetaOgAudio = {
  __typename?: 'MetaOgAudio';
  secure_url?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type MetaOpenGraph = {
  __typename?: 'MetaOpenGraph';
  article?: Maybe<MetaOgArticle>;
  audio?: Maybe<Array<Maybe<MetaOgAudio>>>;
  description?: Maybe<Scalars['String']>;
  determiner?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<MetaOgImages>>>;
  locale?: Maybe<Scalars['String']>;
  locale_alt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  videos?: Maybe<Array<Maybe<MetaOgVideos>>>;
};

export type MetaThumbnails = {
  __typename?: 'MetaThumbnails';
  height?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type MetaTwitterAppFields = {
  __typename?: 'MetaTwitterAppFields';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type MetaTwitterApps = {
  __typename?: 'MetaTwitterApps';
  googleplay?: Maybe<MetaTwitterAppFields>;
  ipad?: Maybe<MetaTwitterAppFields>;
  iphone?: Maybe<MetaTwitterAppFields>;
};

export type MetaTwitterCard = {
  __typename?: 'MetaTwitterCard';
  apps?: Maybe<MetaTwitterApps>;
  card?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  creator_id?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<MetaTwitterImages>>>;
  players?: Maybe<Array<Maybe<MetaTwitterPlayers>>>;
  site?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type MetaTwitterImages = {
  __typename?: 'MetaTwitterImages';
  alt?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type MetaTwitterPlayers = {
  __typename?: 'MetaTwitterPlayers';
  height?: Maybe<Scalars['Int']>;
  stream?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  author?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  favicon?: Maybe<Scalars['String']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  oEmbed?: Maybe<OEmbed>;
  open_graph?: Maybe<MetaOpenGraph>;
  title?: Maybe<Scalars['String']>;
  twitter_card?: Maybe<MetaTwitterCard>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addChannel: Channel;
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
  unlinkChannel: Scalars['Boolean'];
  updateTweet?: Maybe<Tweet>;
};


export type MutationAddChannelArgs = {
  channelParentId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  family: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  mintAuthority: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
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
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  consumerName?: InputMaybe<Scalars['String']>;
  coverPhoto?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<UserDataInput>;
  dob?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};


export type MutationFollowArgs = {
  id: Scalars['ID'];
};


export type MutationLoginRegisterArgs = {
  publicAddress: Scalars['String'];
  signature?: InputMaybe<Scalars['String']>;
};


export type MutationNewTweetArgs = {
  channel?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<Scalars['String']>>;
  gif?: InputMaybe<GifInput>;
  mentions?: InputMaybe<Array<Scalars['String']>>;
  nft?: InputMaybe<NftInput>;
  parentTweet?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  text: Scalars['String'];
};


export type MutationSignFileUrlArgs = {
  bucket?: InputMaybe<Scalars['String']>;
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
  skin?: InputMaybe<Scalars['Int']>;
};


export type MutationToggleRetweetArgs = {
  id: Scalars['ID'];
};


export type MutationUnfollowArgs = {
  id: Scalars['ID'];
};


export type MutationUnlinkChannelArgs = {
  channelId: Scalars['ID'];
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
  attributes?: InputMaybe<Array<InputMaybe<AttributesEntityInput>>>;
  collection?: InputMaybe<CollectionInput>;
  description?: InputMaybe<Scalars['String']>;
  externalUrl?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<PropertiesInput>;
  publicKey: Scalars['String'];
  sellerFeeBasisPoints?: InputMaybe<Scalars['Int']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type Nonce = {
  __typename?: 'Nonce';
  hasPublicAddress: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type OEmbed = {
  __typename?: 'OEmbed';
  author_name?: Maybe<Scalars['String']>;
  author_url?: Maybe<Scalars['String']>;
  cache_age?: Maybe<Scalars['Int']>;
  provider_name?: Maybe<Scalars['String']>;
  provider_url?: Maybe<Scalars['String']>;
  thumbnails?: Maybe<Array<Maybe<MetaThumbnails>>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<MetaMediaType>;
  version?: Maybe<Scalars['String']>;
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
  category?: InputMaybe<Scalars['String']>;
  creators?: InputMaybe<Array<InputMaybe<CreatorsEntityInput>>>;
  files?: InputMaybe<Array<InputMaybe<FilesEntityInput>>>;
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Tweet>;
  getChannelById: Array<Tweet>;
  getChannels: Array<Channel>;
  getMeta?: Maybe<Metadata>;
  healthCheck: Scalars['String'];
  heroFeed: Array<Tweet>;
  me: User;
  mentions: Array<Mention>;
  newMeepsCount?: Maybe<Scalars['Int']>;
  oneSignal: OneSignal;
  profile: User;
  profileById: User;
  profileByPubKey: User;
  searchTweets: Array<Tweet>;
  searchUser: Array<User>;
  tipCount: TipCount;
  tweet: Tweet;
  userFollow: Array<User>;
  users: Array<User>;
};


export type QueryFeedArgs = {
  global?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetChannelByIdArgs = {
  channelId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMetaArgs = {
  url?: InputMaybe<Scalars['String']>;
};


export type QueryHeroFeedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMentionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNewMeepsCountArgs = {
  date?: InputMaybe<Scalars['String']>;
};


export type QueryOneSignalArgs = {
  oneSignalId: Scalars['String'];
};


export type QueryProfileArgs = {
  handle?: InputMaybe<Scalars['String']>;
};


export type QueryProfileByIdArgs = {
  id: Scalars['String'];
};


export type QueryProfileByPubKeyArgs = {
  publicAddress: Scalars['String'];
};


export type QuerySearchTweetsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QuerySearchUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QueryTipCountArgs = {
  dateFrom?: InputMaybe<Scalars['String']>;
  leaders?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<TipCountType>;
};


export type QueryTweetArgs = {
  id: Scalars['ID'];
};


export type QueryUserFollowArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Reaction = {
  __typename?: 'Reaction';
  count: Scalars['Int'];
  emojiId: Scalars['String'];
  id: Scalars['ID'];
  isMine: Scalars['Boolean'];
  skin?: Maybe<Scalars['Int']>;
  tweet: Tweet;
  user: User;
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

export type TipCount = {
  __typename?: 'TipCount';
  dateFrom?: Maybe<Scalars['String']>;
  leaders?: Maybe<Array<Maybe<TipLeader>>>;
  total?: Maybe<Scalars['String']>;
  type?: Maybe<TipCountType>;
};

export enum TipCountType {
  Tweet = 'tweet',
  User = 'user'
}

export type TipInput = {
  tipAmount: Scalars['String'];
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};

export type TipLeader = {
  __typename?: 'TipLeader';
  total?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Tweet = {
  __typename?: 'Tweet';
  channel?: Maybe<Channel>;
  childTweets?: Maybe<Array<Maybe<Tweet>>>;
  comments: Array<Comment>;
  commentsCount: Scalars['Int'];
  createdAt?: Maybe<Scalars['String']>;
  files?: Maybe<Array<File>>;
  gif?: Maybe<Gif>;
  id: Scalars['ID'];
  isRetweet: Scalars['Boolean'];
  isTweetMine: Scalars['Boolean'];
  mentions?: Maybe<Array<Scalars['String']>>;
  nft?: Maybe<Nft>;
  parentTweet?: Maybe<Tweet>;
  reactions?: Maybe<Array<Reaction>>;
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
  avatar: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  consumerName?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  data?: Maybe<UserData>;
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

export type UserData = {
  __typename?: 'UserData';
  avatarMint?: Maybe<Scalars['String']>;
  avatarUpdateAuthority?: Maybe<Scalars['String']>;
};

export type UserDataInput = {
  avatarMint?: InputMaybe<Scalars['String']>;
  avatarUpdateAuthority?: InputMaybe<Scalars['String']>;
};

export type AddChannelMutationVariables = Exact<{
  mintAuthority: Scalars['String'];
  name: Scalars['String'];
  family: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  channelParentId?: InputMaybe<Scalars['String']>;
}>;


export type AddChannelMutation = { __typename?: 'Mutation', addChannel: { __typename?: 'Channel', id: string, mintAuthority: string, name: string, family: string, description?: string | null, image?: string | null, channelParentId?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, membersCount?: { __typename?: 'MembersCount', count?: number | null, avatars?: Array<string | null> | null } | null } };

export type GetChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsQuery = { __typename?: 'Query', getChannels: Array<{ __typename?: 'Channel', id: string, mintAuthority: string, name: string, family: string, description?: string | null, image?: string | null, channelParentId?: string | null, status?: string | null, verified?: boolean | null, membersCount?: { __typename?: 'MembersCount', count?: number | null, avatars?: Array<string | null> | null } | null }> };

export type UnlinkChannelMutationVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type UnlinkChannelMutation = { __typename?: 'Mutation', unlinkChannel: boolean };

export type GetChannelByIdQueryVariables = Exact<{
  channelId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetChannelByIdQuery = { __typename?: 'Query', getChannelById: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null }> };

export type FeedQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
  global?: InputMaybe<Scalars['Boolean']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, childTweets?: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null } | null> | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null }> };

export type HeroFeedQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type HeroFeedQuery = { __typename?: 'Query', heroFeed: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, childTweets?: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null } | null> | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null }> };

export type NewMeepsCountQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']>;
}>;


export type NewMeepsCountQuery = { __typename?: 'Query', newMeepsCount?: number | null };

export type BaseUserFragment = { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null };

export type TweetDataFragment = { __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null };

export type HealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthCheckQuery = { __typename?: 'Query', healthCheck: string };

export type MentionsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type MentionsQuery = { __typename?: 'Query', mentions: Array<{ __typename?: 'Mention', id: string, type?: string | null, createdAt?: string | null, tweet?: { __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, common?: { __typename?: 'Common', emojiId?: string | null, emojiUserId?: string | null } | null }> };

export type GetMetaQueryVariables = Exact<{
  url?: InputMaybe<Scalars['String']>;
}>;


export type GetMetaQuery = { __typename?: 'Query', getMeta?: { __typename?: 'Metadata', title?: string | null, description?: string | null, keywords?: Array<string | null> | null, favicon?: string | null, author?: string | null, oEmbed?: { __typename?: 'OEmbed', type?: MetaMediaType | null, version?: string | null, title?: string | null, author_name?: string | null, author_url?: string | null, provider_name?: string | null, provider_url?: string | null, cache_age?: number | null, thumbnails?: Array<{ __typename?: 'MetaThumbnails', url?: string | null, width?: number | null, height?: number | null } | null> | null } | null, twitter_card?: { __typename?: 'MetaTwitterCard', card?: string | null, site?: string | null, creator?: string | null, creator_id?: string | null, title?: string | null, description?: string | null, players?: Array<{ __typename?: 'MetaTwitterPlayers', url?: string | null, stream?: string | null, height?: number | null, width?: number | null } | null> | null, apps?: { __typename?: 'MetaTwitterApps', iphone?: { __typename?: 'MetaTwitterAppFields', id?: string | null, name?: string | null, url?: string | null } | null, ipad?: { __typename?: 'MetaTwitterAppFields', id?: string | null, name?: string | null, url?: string | null } | null, googleplay?: { __typename?: 'MetaTwitterAppFields', id?: string | null, name?: string | null, url?: string | null } | null } | null, images?: Array<{ __typename?: 'MetaTwitterImages', url?: string | null, alt?: string | null } | null> | null } | null, open_graph?: { __typename?: 'MetaOpenGraph', title?: string | null, type?: string | null, url?: string | null, description?: string | null, determiner?: string | null, locale?: string | null, locale_alt?: string | null, images?: Array<{ __typename?: 'MetaOGImages', url?: string | null, secure_url?: string | null, type?: string | null, width?: number | null, height?: number | null } | null> | null, audio?: Array<{ __typename?: 'MetaOgAudio', url?: string | null, secure_url?: string | null, type?: string | null } | null> | null, videos?: Array<{ __typename?: 'MetaOGVideos', url?: string | null, stream?: string | null, height?: number | null, width?: number | null, tags?: Array<string | null> | null } | null> | null, article?: { __typename?: 'MetaOGArticle', published_time?: string | null, modified_time?: string | null, expiration_time?: string | null, author?: string | null, section?: string | null, tags?: Array<string | null> | null } | null } | null } | null };

export type OneSignalQueryVariables = Exact<{
  oneSignalId: Scalars['String'];
}>;


export type OneSignalQuery = { __typename?: 'Query', oneSignal: { __typename?: 'OneSignal', id: string, oneSignalId?: string | null, user?: { __typename?: 'User', id: string } | null } };

export type ProfileQueryVariables = Exact<{
  handle?: InputMaybe<Scalars['String']>;
}>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, publicAddress: string, handle: string, consumerName?: string | null, avatar: string, coverPhoto?: string | null, dob?: string | null, location?: string | null, website?: string | null, isSelf: boolean, isFollowing: boolean, followersCount: number, followingCount: number, tweetsCount: number, newMentionsCount: number, bio?: string | null, createdAt?: string | null, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null, tweets: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null }> } };

export type ProfileByPubKeyQueryVariables = Exact<{
  publicAddress: Scalars['String'];
}>;


export type ProfileByPubKeyQuery = { __typename?: 'Query', profileByPubKey: { __typename?: 'User', id: string, publicAddress: string, handle: string, consumerName?: string | null, avatar: string, coverPhoto?: string | null, dob?: string | null, location?: string | null, website?: string | null, isSelf: boolean, bio?: string | null, createdAt?: string | null, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } };

export type ProfileByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProfileByIdQuery = { __typename?: 'Query', profileById: { __typename?: 'User', id: string, publicAddress: string, handle: string, consumerName?: string | null, avatar: string, coverPhoto?: string | null, dob?: string | null, location?: string | null, website?: string | null, isSelf: boolean, bio?: string | null, createdAt?: string | null, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } };

export type EditProfileMutationVariables = Exact<{
  handle?: InputMaybe<Scalars['String']>;
  consumerName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  coverPhoto?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<UserDataInput>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } };

export type TweetReactionsQueryVariables = Exact<{
  tweetId: Scalars['ID'];
}>;


export type TweetReactionsQuery = { __typename?: 'Query', tweet: { __typename?: 'Tweet', reactions?: Array<{ __typename?: 'Reaction', emojiId: string, id: string, isMine: boolean, user: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } }> | null } };

export type ToggleReactionMutationVariables = Exact<{
  id: Scalars['ID'];
  emojiId: Scalars['String'];
  skin?: InputMaybe<Scalars['Int']>;
}>;


export type ToggleReactionMutation = { __typename?: 'Mutation', toggleReaction: boolean };

export type SearchUserQueryVariables = Exact<{
  term: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', id: string, handle: string, consumerName?: string | null, avatar: string, followingCount: number, followersCount: number, tweetsCount: number, isFollowing: boolean, isSelf: boolean }> };

export type SearchTweetsQueryVariables = Exact<{
  term: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type SearchTweetsQuery = { __typename?: 'Query', searchTweets: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null }> };

export type TipCreatorMutationVariables = Exact<{
  tipAmount: Scalars['String'];
  tweetId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type TipCreatorMutation = { __typename?: 'Mutation', tipCreator: { __typename?: 'Tip', id: string } };

export type TipCountUsersQueryVariables = Exact<{
  dateFrom?: InputMaybe<Scalars['String']>;
  leaders?: InputMaybe<Scalars['Int']>;
}>;


export type TipCountUsersQuery = { __typename?: 'Query', tipCount: { __typename?: 'TipCount', dateFrom?: string | null, total?: string | null, leaders?: Array<{ __typename?: 'TipLeader', total?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null> | null } };

export type TweetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TweetQuery = { __typename?: 'Query', tweet: { __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, childTweets?: Array<{ __typename?: 'Tweet', id: string, text: string, tags: Array<string>, isTweetMine: boolean, commentsCount: number, retweetsCount: number, isRetweet: boolean, tipsCount?: string | null, createdAt?: string | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null } | null> | null, channel?: { __typename?: 'Channel', id: string } | null, parentTweet?: { __typename?: 'Tweet', id: string, text: string, createdAt?: string | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null } | null, files?: Array<{ __typename?: 'File', id: string, url: string }> | null, gif?: { __typename?: 'Gif', id: string, title: string, fixedHeightUrl: string, originalUrl: string } | null, nft?: { __typename?: 'NFT', id: string, publicKey: string, name?: string | null, symbol?: string | null, description?: string | null, sellerFeeBasisPoints?: number | null, externalUrl?: string | null, image: string, attributes?: Array<{ __typename?: 'AttributesEntity', traitType?: string | null, value?: string | null } | null> | null, collection?: { __typename?: 'Collection', name?: string | null, family?: string | null } | null, properties?: { __typename?: 'Properties', category?: string | null, files?: Array<{ __typename?: 'FilesEntity', uri?: string | null, type?: string | null } | null> | null, creators?: Array<{ __typename?: 'CreatorsEntity', address?: string | null, share?: number | null } | null> | null } | null } | null, user?: { __typename?: 'User', id: string, avatar: string, handle: string, consumerName?: string | null, publicAddress: string, data?: { __typename?: 'UserData', avatarMint?: string | null, avatarUpdateAuthority?: string | null } | null } | null, reactions?: Array<{ __typename?: 'Reaction', id: string, emojiId: string, skin?: number | null, isMine: boolean, count: number }> | null } };

export type NewTweetMutationVariables = Exact<{
  text: Scalars['String'];
  files: Array<Scalars['String']> | Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  mentions: Array<Scalars['String']> | Scalars['String'];
  gif?: InputMaybe<GifInput>;
  nft?: InputMaybe<NftInput>;
  parentTweet?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
}>;


export type NewTweetMutation = { __typename?: 'Mutation', newTweet: { __typename?: 'Tweet', id: string, text: string, tags: Array<string>, mentions?: Array<string> | null, commentsCount: number, createdAt?: string | null } };

export type ToggleRetweetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ToggleRetweetMutation = { __typename?: 'Mutation', toggleRetweet: boolean };

export type DeleteTweetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTweetMutation = { __typename?: 'Mutation', deleteTweet?: { __typename?: 'Tweet', id: string } | null };

export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  avatar
  handle
  consumerName
  publicAddress
  data {
    avatarMint
    avatarUpdateAuthority
  }
}
    `;
export const TweetDataFragmentDoc = gql`
    fragment TweetData on Tweet {
  id
  text
  tags
  isTweetMine
  commentsCount
  retweetsCount
  isRetweet
  tipsCount
  createdAt
  channel {
    id
  }
  parentTweet {
    id
    text
    createdAt
    user {
      ...BaseUser
    }
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
    ...BaseUser
  }
  reactions {
    id
    emojiId
    skin
    isMine
    count
  }
}
    ${BaseUserFragmentDoc}`;
export const AddChannelDocument = gql`
    mutation addChannel($mintAuthority: String!, $name: String!, $family: String!, $description: String, $image: String, $status: String, $channelParentId: String) {
  addChannel(
    mintAuthority: $mintAuthority
    name: $name
    family: $family
    description: $description
    image: $image
    status: $status
    channelParentId: $channelParentId
  ) {
    id
    mintAuthority
    name
    family
    description
    image
    channelParentId
    status
    membersCount {
      count
      avatars
    }
    createdAt
    updatedAt
  }
}
    `;
export type AddChannelMutationFn = Apollo.MutationFunction<AddChannelMutation, AddChannelMutationVariables>;

/**
 * __useAddChannelMutation__
 *
 * To run a mutation, you first call `useAddChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChannelMutation, { data, loading, error }] = useAddChannelMutation({
 *   variables: {
 *      mintAuthority: // value for 'mintAuthority'
 *      name: // value for 'name'
 *      family: // value for 'family'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      status: // value for 'status'
 *      channelParentId: // value for 'channelParentId'
 *   },
 * });
 */
export function useAddChannelMutation(baseOptions?: Apollo.MutationHookOptions<AddChannelMutation, AddChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddChannelMutation, AddChannelMutationVariables>(AddChannelDocument, options);
      }
export type AddChannelMutationHookResult = ReturnType<typeof useAddChannelMutation>;
export type AddChannelMutationResult = Apollo.MutationResult<AddChannelMutation>;
export type AddChannelMutationOptions = Apollo.BaseMutationOptions<AddChannelMutation, AddChannelMutationVariables>;
export const GetChannelsDocument = gql`
    query getChannels {
  getChannels {
    id
    mintAuthority
    name
    family
    description
    image
    channelParentId
    status
    verified
    membersCount {
      count
      avatars
    }
  }
}
    `;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
      }
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export const UnlinkChannelDocument = gql`
    mutation unlinkChannel($channelId: ID!) {
  unlinkChannel(channelId: $channelId)
}
    `;
export type UnlinkChannelMutationFn = Apollo.MutationFunction<UnlinkChannelMutation, UnlinkChannelMutationVariables>;

/**
 * __useUnlinkChannelMutation__
 *
 * To run a mutation, you first call `useUnlinkChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkChannelMutation, { data, loading, error }] = useUnlinkChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useUnlinkChannelMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkChannelMutation, UnlinkChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkChannelMutation, UnlinkChannelMutationVariables>(UnlinkChannelDocument, options);
      }
export type UnlinkChannelMutationHookResult = ReturnType<typeof useUnlinkChannelMutation>;
export type UnlinkChannelMutationResult = Apollo.MutationResult<UnlinkChannelMutation>;
export type UnlinkChannelMutationOptions = Apollo.BaseMutationOptions<UnlinkChannelMutation, UnlinkChannelMutationVariables>;
export const GetChannelByIdDocument = gql`
    query getChannelById($channelId: ID!, $offset: Int, $limit: Int) {
  getChannelById(channelId: $channelId, offset: $offset, limit: $limit) {
    ...TweetData
  }
}
    ${TweetDataFragmentDoc}`;

/**
 * __useGetChannelByIdQuery__
 *
 * To run a query within a React component, call `useGetChannelByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelByIdQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetChannelByIdQuery(baseOptions: Apollo.QueryHookOptions<GetChannelByIdQuery, GetChannelByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelByIdQuery, GetChannelByIdQueryVariables>(GetChannelByIdDocument, options);
      }
export function useGetChannelByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelByIdQuery, GetChannelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelByIdQuery, GetChannelByIdQueryVariables>(GetChannelByIdDocument, options);
        }
export type GetChannelByIdQueryHookResult = ReturnType<typeof useGetChannelByIdQuery>;
export type GetChannelByIdLazyQueryHookResult = ReturnType<typeof useGetChannelByIdLazyQuery>;
export type GetChannelByIdQueryResult = Apollo.QueryResult<GetChannelByIdQuery, GetChannelByIdQueryVariables>;
export const FeedDocument = gql`
    query feed($offset: Int!, $limit: Int, $global: Boolean) {
  feed(offset: $offset, limit: $limit, global: $global) {
    ...TweetData
    childTweets {
      ...TweetData
    }
  }
}
    ${TweetDataFragmentDoc}`;

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
export const HeroFeedDocument = gql`
    query heroFeed($offset: Int!, $limit: Int) {
  heroFeed(offset: $offset, limit: $limit) {
    ...TweetData
    childTweets {
      ...TweetData
    }
  }
}
    ${TweetDataFragmentDoc}`;

/**
 * __useHeroFeedQuery__
 *
 * To run a query within a React component, call `useHeroFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeroFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeroFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useHeroFeedQuery(baseOptions: Apollo.QueryHookOptions<HeroFeedQuery, HeroFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HeroFeedQuery, HeroFeedQueryVariables>(HeroFeedDocument, options);
      }
export function useHeroFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeroFeedQuery, HeroFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HeroFeedQuery, HeroFeedQueryVariables>(HeroFeedDocument, options);
        }
export type HeroFeedQueryHookResult = ReturnType<typeof useHeroFeedQuery>;
export type HeroFeedLazyQueryHookResult = ReturnType<typeof useHeroFeedLazyQuery>;
export type HeroFeedQueryResult = Apollo.QueryResult<HeroFeedQuery, HeroFeedQueryVariables>;
export const NewMeepsCountDocument = gql`
    query newMeepsCount($date: String) {
  newMeepsCount(date: $date)
}
    `;

/**
 * __useNewMeepsCountQuery__
 *
 * To run a query within a React component, call `useNewMeepsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewMeepsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMeepsCountQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useNewMeepsCountQuery(baseOptions?: Apollo.QueryHookOptions<NewMeepsCountQuery, NewMeepsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewMeepsCountQuery, NewMeepsCountQueryVariables>(NewMeepsCountDocument, options);
      }
export function useNewMeepsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewMeepsCountQuery, NewMeepsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewMeepsCountQuery, NewMeepsCountQueryVariables>(NewMeepsCountDocument, options);
        }
export type NewMeepsCountQueryHookResult = ReturnType<typeof useNewMeepsCountQuery>;
export type NewMeepsCountLazyQueryHookResult = ReturnType<typeof useNewMeepsCountLazyQuery>;
export type NewMeepsCountQueryResult = Apollo.QueryResult<NewMeepsCountQuery, NewMeepsCountQueryVariables>;
export const HealthCheckDocument = gql`
    query healthCheck {
  healthCheck
}
    `;

/**
 * __useHealthCheckQuery__
 *
 * To run a query within a React component, call `useHealthCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthCheckQuery(baseOptions?: Apollo.QueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
      }
export function useHealthCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
        }
export type HealthCheckQueryHookResult = ReturnType<typeof useHealthCheckQuery>;
export type HealthCheckLazyQueryHookResult = ReturnType<typeof useHealthCheckLazyQuery>;
export type HealthCheckQueryResult = Apollo.QueryResult<HealthCheckQuery, HealthCheckQueryVariables>;
export const MentionsDocument = gql`
    query mentions($offset: Int, $limit: Int) {
  mentions(offset: $offset, limit: $limit) {
    id
    type
    tweet {
      ...TweetData
    }
    user {
      ...BaseUser
    }
    common {
      emojiId
      emojiUserId
    }
    createdAt
  }
}
    ${TweetDataFragmentDoc}
${BaseUserFragmentDoc}`;

/**
 * __useMentionsQuery__
 *
 * To run a query within a React component, call `useMentionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentionsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMentionsQuery(baseOptions?: Apollo.QueryHookOptions<MentionsQuery, MentionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MentionsQuery, MentionsQueryVariables>(MentionsDocument, options);
      }
export function useMentionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MentionsQuery, MentionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MentionsQuery, MentionsQueryVariables>(MentionsDocument, options);
        }
export type MentionsQueryHookResult = ReturnType<typeof useMentionsQuery>;
export type MentionsLazyQueryHookResult = ReturnType<typeof useMentionsLazyQuery>;
export type MentionsQueryResult = Apollo.QueryResult<MentionsQuery, MentionsQueryVariables>;
export const GetMetaDocument = gql`
    query getMeta($url: String) {
  getMeta(url: $url) {
    title
    description
    keywords
    favicon
    author
    oEmbed {
      type
      version
      title
      author_name
      author_url
      provider_name
      provider_url
      cache_age
      thumbnails {
        url
        width
        height
      }
    }
    twitter_card {
      card
      site
      creator
      creator_id
      title
      description
      players {
        url
        stream
        height
        width
      }
      apps {
        iphone {
          id
          name
          url
        }
        ipad {
          id
          name
          url
        }
        googleplay {
          id
          name
          url
        }
      }
      images {
        url
        alt
      }
    }
    open_graph {
      title
      type
      images {
        url
        secure_url
        type
        width
        height
      }
      url
      audio {
        url
        secure_url
        type
      }
      description
      determiner
      locale
      locale_alt
      videos {
        url
        stream
        height
        width
        tags
      }
      article {
        published_time
        modified_time
        expiration_time
        author
        section
        tags
      }
    }
  }
}
    `;

/**
 * __useGetMetaQuery__
 *
 * To run a query within a React component, call `useGetMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetaQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetMetaQuery(baseOptions?: Apollo.QueryHookOptions<GetMetaQuery, GetMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMetaQuery, GetMetaQueryVariables>(GetMetaDocument, options);
      }
export function useGetMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMetaQuery, GetMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMetaQuery, GetMetaQueryVariables>(GetMetaDocument, options);
        }
export type GetMetaQueryHookResult = ReturnType<typeof useGetMetaQuery>;
export type GetMetaLazyQueryHookResult = ReturnType<typeof useGetMetaLazyQuery>;
export type GetMetaQueryResult = Apollo.QueryResult<GetMetaQuery, GetMetaQueryVariables>;
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
    query profile($handle: String) {
  profile(handle: $handle) {
    id
    publicAddress
    handle
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
    data {
      avatarMint
      avatarUpdateAuthority
    }
    tweets {
      ...TweetData
    }
    createdAt
  }
}
    ${TweetDataFragmentDoc}`;

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
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
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
export const ProfileByPubKeyDocument = gql`
    query profileByPubKey($publicAddress: String!) {
  profileByPubKey(publicAddress: $publicAddress) {
    id
    publicAddress
    handle
    consumerName
    avatar
    coverPhoto
    dob
    location
    website
    isSelf
    bio
    data {
      avatarMint
      avatarUpdateAuthority
    }
    createdAt
  }
}
    `;

/**
 * __useProfileByPubKeyQuery__
 *
 * To run a query within a React component, call `useProfileByPubKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileByPubKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileByPubKeyQuery({
 *   variables: {
 *      publicAddress: // value for 'publicAddress'
 *   },
 * });
 */
export function useProfileByPubKeyQuery(baseOptions: Apollo.QueryHookOptions<ProfileByPubKeyQuery, ProfileByPubKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileByPubKeyQuery, ProfileByPubKeyQueryVariables>(ProfileByPubKeyDocument, options);
      }
export function useProfileByPubKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileByPubKeyQuery, ProfileByPubKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileByPubKeyQuery, ProfileByPubKeyQueryVariables>(ProfileByPubKeyDocument, options);
        }
export type ProfileByPubKeyQueryHookResult = ReturnType<typeof useProfileByPubKeyQuery>;
export type ProfileByPubKeyLazyQueryHookResult = ReturnType<typeof useProfileByPubKeyLazyQuery>;
export type ProfileByPubKeyQueryResult = Apollo.QueryResult<ProfileByPubKeyQuery, ProfileByPubKeyQueryVariables>;
export const ProfileByIdDocument = gql`
    query profileById($id: String!) {
  profileById(id: $id) {
    id
    publicAddress
    handle
    consumerName
    avatar
    coverPhoto
    dob
    location
    website
    isSelf
    bio
    data {
      avatarMint
      avatarUpdateAuthority
    }
    createdAt
  }
}
    `;

/**
 * __useProfileByIdQuery__
 *
 * To run a query within a React component, call `useProfileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProfileByIdQuery(baseOptions: Apollo.QueryHookOptions<ProfileByIdQuery, ProfileByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileByIdQuery, ProfileByIdQueryVariables>(ProfileByIdDocument, options);
      }
export function useProfileByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileByIdQuery, ProfileByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileByIdQuery, ProfileByIdQueryVariables>(ProfileByIdDocument, options);
        }
export type ProfileByIdQueryHookResult = ReturnType<typeof useProfileByIdQuery>;
export type ProfileByIdLazyQueryHookResult = ReturnType<typeof useProfileByIdLazyQuery>;
export type ProfileByIdQueryResult = Apollo.QueryResult<ProfileByIdQuery, ProfileByIdQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    avatar
    handle
    consumerName
    data {
      avatarMint
      avatarUpdateAuthority
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($handle: String, $consumerName: String, $location: String, $dob: String, $bio: String, $website: String, $avatar: String, $coverPhoto: String, $data: UserDataInput) {
  editProfile(
    handle: $handle
    consumerName: $consumerName
    location: $location
    dob: $dob
    bio: $bio
    website: $website
    avatar: $avatar
    coverPhoto: $coverPhoto
    data: $data
  ) {
    id
    avatar
    handle
    consumerName
    data {
      avatarMint
      avatarUpdateAuthority
    }
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
 *      data: // value for 'data'
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
export const TweetReactionsDocument = gql`
    query tweetReactions($tweetId: ID!) {
  tweet(id: $tweetId) {
    reactions {
      user {
        ...BaseUser
      }
      emojiId
      id
      isMine
    }
  }
}
    ${BaseUserFragmentDoc}`;

/**
 * __useTweetReactionsQuery__
 *
 * To run a query within a React component, call `useTweetReactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetReactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetReactionsQuery({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useTweetReactionsQuery(baseOptions: Apollo.QueryHookOptions<TweetReactionsQuery, TweetReactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TweetReactionsQuery, TweetReactionsQueryVariables>(TweetReactionsDocument, options);
      }
export function useTweetReactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetReactionsQuery, TweetReactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TweetReactionsQuery, TweetReactionsQueryVariables>(TweetReactionsDocument, options);
        }
export type TweetReactionsQueryHookResult = ReturnType<typeof useTweetReactionsQuery>;
export type TweetReactionsLazyQueryHookResult = ReturnType<typeof useTweetReactionsLazyQuery>;
export type TweetReactionsQueryResult = Apollo.QueryResult<TweetReactionsQuery, TweetReactionsQueryVariables>;
export const ToggleReactionDocument = gql`
    mutation toggleReaction($id: ID!, $emojiId: String!, $skin: Int) {
  toggleReaction(id: $id, emojiId: $emojiId, skin: $skin)
}
    `;
export type ToggleReactionMutationFn = Apollo.MutationFunction<ToggleReactionMutation, ToggleReactionMutationVariables>;

/**
 * __useToggleReactionMutation__
 *
 * To run a mutation, you first call `useToggleReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleReactionMutation, { data, loading, error }] = useToggleReactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      emojiId: // value for 'emojiId'
 *      skin: // value for 'skin'
 *   },
 * });
 */
export function useToggleReactionMutation(baseOptions?: Apollo.MutationHookOptions<ToggleReactionMutation, ToggleReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleReactionMutation, ToggleReactionMutationVariables>(ToggleReactionDocument, options);
      }
export type ToggleReactionMutationHookResult = ReturnType<typeof useToggleReactionMutation>;
export type ToggleReactionMutationResult = Apollo.MutationResult<ToggleReactionMutation>;
export type ToggleReactionMutationOptions = Apollo.BaseMutationOptions<ToggleReactionMutation, ToggleReactionMutationVariables>;
export const SearchUserDocument = gql`
    query searchUser($term: String!, $offset: Int, $limit: Int) {
  searchUser(term: $term, offset: $offset, limit: $limit) {
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

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      term: // value for 'term'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const SearchTweetsDocument = gql`
    query searchTweets($term: String!, $type: String, $offset: Int, $limit: Int) {
  searchTweets(term: $term, type: $type, offset: $offset, limit: $limit) {
    ...TweetData
  }
}
    ${TweetDataFragmentDoc}`;

/**
 * __useSearchTweetsQuery__
 *
 * To run a query within a React component, call `useSearchTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTweetsQuery({
 *   variables: {
 *      term: // value for 'term'
 *      type: // value for 'type'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchTweetsQuery(baseOptions: Apollo.QueryHookOptions<SearchTweetsQuery, SearchTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTweetsQuery, SearchTweetsQueryVariables>(SearchTweetsDocument, options);
      }
export function useSearchTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTweetsQuery, SearchTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTweetsQuery, SearchTweetsQueryVariables>(SearchTweetsDocument, options);
        }
export type SearchTweetsQueryHookResult = ReturnType<typeof useSearchTweetsQuery>;
export type SearchTweetsLazyQueryHookResult = ReturnType<typeof useSearchTweetsLazyQuery>;
export type SearchTweetsQueryResult = Apollo.QueryResult<SearchTweetsQuery, SearchTweetsQueryVariables>;
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
export const TipCountUsersDocument = gql`
    query tipCountUsers($dateFrom: String, $leaders: Int) {
  tipCount(dateFrom: $dateFrom, leaders: $leaders) {
    dateFrom
    total
    leaders {
      total
      user {
        ...BaseUser
      }
    }
  }
}
    ${BaseUserFragmentDoc}`;

/**
 * __useTipCountUsersQuery__
 *
 * To run a query within a React component, call `useTipCountUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTipCountUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTipCountUsersQuery({
 *   variables: {
 *      dateFrom: // value for 'dateFrom'
 *      leaders: // value for 'leaders'
 *   },
 * });
 */
export function useTipCountUsersQuery(baseOptions?: Apollo.QueryHookOptions<TipCountUsersQuery, TipCountUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TipCountUsersQuery, TipCountUsersQueryVariables>(TipCountUsersDocument, options);
      }
export function useTipCountUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TipCountUsersQuery, TipCountUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TipCountUsersQuery, TipCountUsersQueryVariables>(TipCountUsersDocument, options);
        }
export type TipCountUsersQueryHookResult = ReturnType<typeof useTipCountUsersQuery>;
export type TipCountUsersLazyQueryHookResult = ReturnType<typeof useTipCountUsersLazyQuery>;
export type TipCountUsersQueryResult = Apollo.QueryResult<TipCountUsersQuery, TipCountUsersQueryVariables>;
export const TweetDocument = gql`
    query tweet($id: ID!) {
  tweet(id: $id) {
    ...TweetData
    childTweets {
      ...TweetData
    }
  }
}
    ${TweetDataFragmentDoc}`;

/**
 * __useTweetQuery__
 *
 * To run a query within a React component, call `useTweetQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTweetQuery(baseOptions: Apollo.QueryHookOptions<TweetQuery, TweetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TweetQuery, TweetQueryVariables>(TweetDocument, options);
      }
export function useTweetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetQuery, TweetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TweetQuery, TweetQueryVariables>(TweetDocument, options);
        }
export type TweetQueryHookResult = ReturnType<typeof useTweetQuery>;
export type TweetLazyQueryHookResult = ReturnType<typeof useTweetLazyQuery>;
export type TweetQueryResult = Apollo.QueryResult<TweetQuery, TweetQueryVariables>;
export const NewTweetDocument = gql`
    mutation newTweet($text: String!, $files: [String!]!, $tags: [String!]!, $mentions: [String!]!, $gif: GifInput, $nft: NFTInput, $parentTweet: String, $channel: String) {
  newTweet(
    text: $text
    files: $files
    tags: $tags
    mentions: $mentions
    gif: $gif
    nft: $nft
    parentTweet: $parentTweet
    channel: $channel
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
export type NewTweetMutationFn = Apollo.MutationFunction<NewTweetMutation, NewTweetMutationVariables>;

/**
 * __useNewTweetMutation__
 *
 * To run a mutation, you first call `useNewTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTweetMutation, { data, loading, error }] = useNewTweetMutation({
 *   variables: {
 *      text: // value for 'text'
 *      files: // value for 'files'
 *      tags: // value for 'tags'
 *      mentions: // value for 'mentions'
 *      gif: // value for 'gif'
 *      nft: // value for 'nft'
 *      parentTweet: // value for 'parentTweet'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useNewTweetMutation(baseOptions?: Apollo.MutationHookOptions<NewTweetMutation, NewTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewTweetMutation, NewTweetMutationVariables>(NewTweetDocument, options);
      }
export type NewTweetMutationHookResult = ReturnType<typeof useNewTweetMutation>;
export type NewTweetMutationResult = Apollo.MutationResult<NewTweetMutation>;
export type NewTweetMutationOptions = Apollo.BaseMutationOptions<NewTweetMutation, NewTweetMutationVariables>;
export const ToggleRetweetDocument = gql`
    mutation toggleRetweet($id: ID!) {
  toggleRetweet(id: $id)
}
    `;
export type ToggleRetweetMutationFn = Apollo.MutationFunction<ToggleRetweetMutation, ToggleRetweetMutationVariables>;

/**
 * __useToggleRetweetMutation__
 *
 * To run a mutation, you first call `useToggleRetweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleRetweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleRetweetMutation, { data, loading, error }] = useToggleRetweetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleRetweetMutation(baseOptions?: Apollo.MutationHookOptions<ToggleRetweetMutation, ToggleRetweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleRetweetMutation, ToggleRetweetMutationVariables>(ToggleRetweetDocument, options);
      }
export type ToggleRetweetMutationHookResult = ReturnType<typeof useToggleRetweetMutation>;
export type ToggleRetweetMutationResult = Apollo.MutationResult<ToggleRetweetMutation>;
export type ToggleRetweetMutationOptions = Apollo.BaseMutationOptions<ToggleRetweetMutation, ToggleRetweetMutationVariables>;
export const DeleteTweetDocument = gql`
    mutation deleteTweet($id: ID!) {
  deleteTweet(id: $id) {
    id
  }
}
    `;
export type DeleteTweetMutationFn = Apollo.MutationFunction<DeleteTweetMutation, DeleteTweetMutationVariables>;

/**
 * __useDeleteTweetMutation__
 *
 * To run a mutation, you first call `useDeleteTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTweetMutation, { data, loading, error }] = useDeleteTweetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTweetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTweetMutation, DeleteTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTweetMutation, DeleteTweetMutationVariables>(DeleteTweetDocument, options);
      }
export type DeleteTweetMutationHookResult = ReturnType<typeof useDeleteTweetMutation>;
export type DeleteTweetMutationResult = Apollo.MutationResult<DeleteTweetMutation>;
export type DeleteTweetMutationOptions = Apollo.BaseMutationOptions<DeleteTweetMutation, DeleteTweetMutationVariables>;
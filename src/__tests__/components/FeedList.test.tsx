import React from "react";
import { FeedList } from "../../components/FeedList";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";

const feed: any = [
  {
    id: "cl084xdy815761s0n5omoxoem0",
    text: "testing after changes in input converted to ts",
    tags: [],
    isTweetMine: true,
    commentsCount: 1,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1646139451616",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [
      {
        id: "cl0c774p371312s0n533u0b29k",
        emojiId: "+1",
        skin: 1,
        isMine: true,
        count: 1,
        __typename: "Reaction",
      },
    ],
    __typename: "Tweet",
  },
  {
    id: "cl081ymfz8867s0n59y782hdj",
    text: "🥰",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1646134470431",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "cl06ku5qr9948ban5356ugu9b",
    text: "😍",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1646045242515",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "ckzzg3lm6169405vun5im00fsmq",
    text: "😘6210",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645614021678",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "ckzzg3cb6167829vun53f79gud8",
    text: "96541651498",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645614009618",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "ckzzfgqwv163794vun5uuak56j0",
    text: "🦧9459559",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645612955455",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [
      {
        id: "cl06ktwei9507ban540vb5u3s",
        emojiId: "laughing",
        skin: null,
        isMine: true,
        count: 1,
        __typename: "Reaction",
      },
    ],
    __typename: "Tweet",
  },
  {
    id: "ckzz3oekx135415vun5lvhk9vj2",
    text: "",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645593157329",
    parentTweet: null,
    files: [],
    gif: {
      id: "ckzz3oel8135425vun5paofgpoa",
      title: "Seth Meyers Reaction GIF by Late Night with Seth Meyers",
      fixedHeightUrl:
        "https://media3.giphy.com/media/8YsjVmpIpEjNKlrL3D/200.mp4?cid=e0fc1889v16eclvv8bcqa6e0ipe89jd8j7xlga5q2d9zd5cz&rid=200.mp4&ct=g",
      originalUrl:
        "https://media3.giphy.com/media/8YsjVmpIpEjNKlrL3D/giphy.mp4?cid=e0fc1889v16eclvv8bcqa6e0ipe89jd8j7xlga5q2d9zd5cz&rid=giphy.mp4&ct=g",
      __typename: "Gif",
    },
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "ckzz2d1i6131338vun5o0yby7ho",
    text: "😍😍😍😍😍😍😍😍😍",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645590947549",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "ckzz2cjue130742vun5iomylsop",
    text: "🎃",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645590924662",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
  {
    id: "ckzxxkyda117508vun5mu4l56jp",
    text: "dsfsfdsf",
    tags: [],
    isTweetMine: true,
    commentsCount: 0,
    retweetsCount: 0,
    isRetweet: false,
    tipsCount: "0",
    createdAt: "1645522452478",
    parentTweet: null,
    files: [],
    gif: null,
    nft: null,
    user: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      avatar: "",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      __typename: "User",
    },
    reactions: [],
    __typename: "Tweet",
  },
];

const error = {
  message: "An error occured",
};

describe("Feed List Rendering", () => {
  test("renders correctly when User have no Feed list", () => {
    const tree = renderer
      .create(<FeedList data={undefined} loading={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when User have Feed list", () => {
    const tree = renderer
      .create(<FeedList data={feed} loading={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when Feed list loading", () => {
    const tree = renderer
      .create(<FeedList data={feed} loading={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when error", () => {
    const tree = renderer
      .create(<FeedList data={undefined} error={error} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

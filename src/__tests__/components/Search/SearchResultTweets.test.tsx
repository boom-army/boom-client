import React from "react";
import { User as UserProps } from "../../../generated/graphql";
import SearchResultTweets from "../../../components/Search/SearchResultTweets";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
// import { MentionsDocument, Tweet } from "../../../generated/graphql";
import { TOGGLE_REACTION, TWEET } from "../../../queries/tweet/index";

export const __mocks__: any = [
  {
    request: {
      query: TOGGLE_REACTION,
      variables: {},
      refetchQueries: [
        { query: TWEET, variables: { id: "cl084xdy815761s0n5omoxoem0" } },
      ],
    },
    result: {
      data: {
        mentions: [],
      },
      errors: "An error occurred",
    },
  },
];

const tweets = {
  searchByTweet: [
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
  ],
};

describe("Search tweets:", () => {
  test("display <SearchResultTweets/> component when tweets undefined", () => {
    const tree = render(
      <SearchResultTweets loading={false} tweets={undefined} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("display <SearchResultTweets/> component when tweets loading", () => {
    const tree = render(
      <SearchResultTweets loading={true} tweets={undefined} />
    );

    expect(tree).toMatchSnapshot();
  });

  test("display <SearchResultTweets/> component when tweets not found", () => {
    const tree = render(<SearchResultTweets loading={false} tweets={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test("display <SearchResultTweets/> component when tweets list found", () => {
    Date.now = jest.fn(() => 1482363367071);
    tweets.searchByTweet[0].createdAt = Date.now().toString();
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <SearchResultTweets loading={false} tweets={tweets} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(tree).toMatchSnapshot();
  });
});

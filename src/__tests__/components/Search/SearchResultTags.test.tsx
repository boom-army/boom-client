import React from "react";
import { User as UserProps } from "../../../generated/graphql";
import SearchResultTags from "../../../components/Search/SearchResultTags";
import { act, fireEvent, render, screen } from "@testing-library/react";
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

const tags = {
  searchByTag: [
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

describe("Search tags:", () => {
  test("display <SearchResultTags/> component when tags undefined", () => {
    const tree = render(<SearchResultTags loading={false} tags={undefined} />);
    expect(tree).toMatchSnapshot();
  });

  test("display <SearchResultTags/> component when tags loading", () => {
    const tree = render(<SearchResultTags loading={true} tags={undefined} />);

    expect(tree).toMatchSnapshot();
  });

  test("display <SearchResultTags/> component when tags not found", () => {
    const tree = render(<SearchResultTags loading={false} tags={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test("display <SearchResultTags/> component when tags list found", () => {
    Date.now = jest.fn(() => 1482363367071);
    tags.searchByTag[0].createdAt = Date.now().toString();
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <SearchResultTags loading={false} tags={tags} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(tree).toMatchSnapshot();
  });
});

test("Assertion testing of <SearchResultTags/> component", () => {
  Date.now = jest.fn(() => 1482363367071);
  tags.searchByTag[0].createdAt = Date.now().toString();
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <SearchResultTags loading={false} tags={tags} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );

  expect(
    screen.getByRole("link", { name: "shy-cloud-4965 @shy-cloud-4965" })
  ).toHaveAttribute("href", "/shy-cloud-4965");
  expect(
    screen.getByRole("link", { name: "a few seconds ago" })
  ).toHaveAttribute(
    "href",
    "/shy-cloud-4965/status/cl084xdy815761s0n5omoxoem0"
  );
});

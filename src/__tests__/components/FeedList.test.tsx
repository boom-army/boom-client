import React from "react";
import { FeedList } from "../../components/FeedList";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { TOGGLE_REACTION, TWEET } from "../../queries/tweet/index";
import { MemoryRouter } from "react-router-dom";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
       // includeStyles: false 
  }
));


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
      data: {},
      errors: "An error occurred",
    },
  },
];

const data: any = {
  feed: [
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

const error = {
  message: "An error occured",
};

describe("Feed List Rendering", () => {
  test("renders correctly when User have no Feed list", () => {
    data.feed.map((item: any) => (item.createdAt = Date.now().toString()));
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <FeedList data={undefined} loading={true} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly when User have Feed list", () => {
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <FeedList data={data} loading={false} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly when Feed list loading", () => {
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <FeedList data={data} loading={true} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly when error", () => {
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <FeedList data={undefined} error={error} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(tree).toMatchSnapshot();
  });
});

test("Assertion testing of  <FeedList/> when User have no Feed list", () => {
  const tree = render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <FeedList data={undefined} loading={false} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );

  expect(
    screen.getByText("Follow some people to get some feed updates")
  ).toBeInTheDocument();
});

test("Assertion testing of  <FeedList/> when User have Feed list", () => {
  const tree = render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <FeedList data={data} loading={false} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );
  expect(
    screen.getByRole("link", { name: "shy-cloud-4965 @shy-cloud-4965" })
  ).toHaveAttribute("href", "/shy-cloud-4965");
});

test("Assertion testing of  <FeedList/> when Feed list loading", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <FeedList data={data} loading={true} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );
  expect(screen.getByRole("progressbar", { name: "" })).toBeInTheDocument();
});

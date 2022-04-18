import React from "react";
import { Notifications } from "../../views/Notifications";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { MentionsDocument } from "../../generated/graphql";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
      query: MentionsDocument,
      variables: {
        offset: 0,
        limit: 10,
      },
      fetchPolicy: "network-only",
    },
    result: {
      data: {
        mentions: [
          {
            id: "ckzz3yhuu3478401mnf2zgolb2",
            text: "Hey @sweet-sky-0445 - is this your first meep! congratulations!!\n",
            tags: [],
            isTweetMine: false,
            commentsCount: 0,
            retweetsCount: 0,
            isRetweet: false,
            tipsCount: "0",
            reactions: [],
            files: [],
            user: {
              id: "cku97qp1a000301mpyoptpo8e",
              avatar:
                "https://i1.sndcdn.com/artworks-gUNkngEJ7WTd043w-kpLWPQ-t500x500.jpg",
              publicAddress: "BhdKDqh8fMxd9L3ewkBTnZtF22BbTpqZNJxUpJP4W51P",
              handle: "quiet-salad",
              consumerName: "QS",
              __typename: "User",
            },
            createdAt: "1645593628134",
            __typename: "Tweet",
          },
        ],
      },
      errors: "An error occurred",
    },
  },
];

const data: any = {
  data: {
    mentions: [
      {
        id: "ckzz3yhuu3478401mnf2zgolb2",
        text: "Hey @sweet-sky-0445 - is this your first meep! congratulations!!\n",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        reactions: [],
        files: [],
        user: {
          id: "cku97qp1a000301mpyoptpo8e",
          avatar:
            "https://i1.sndcdn.com/artworks-gUNkngEJ7WTd043w-kpLWPQ-t500x500.jpg",
          publicAddress: "BhdKDqh8fMxd9L3ewkBTnZtF22BbTpqZNJxUpJP4W51P",
          handle: "quiet-salad",
          consumerName: "QS",
          __typename: "User",
        },
        createdAt: "1645593628134",
        __typename: "Tweet",
      },
    ],
  },
};

it("displays a loading message when fetching", () => {
  const component = renderer.create(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <Notifications />
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Assertion testing of  <Notifications /> component", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <Notifications />
    </MockedProvider>
  );
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

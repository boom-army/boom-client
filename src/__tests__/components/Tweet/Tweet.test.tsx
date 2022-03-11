import React from "react";
import { ShowTweet } from "../../../components/Tweet/Tweet";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
// import { MentionsDocument, Tweet } from "../../../generated/graphql";
import {TOGGLE_REACTION, TWEET } from "../../../queries/tweet/index";
// import { TOGGLE_REACTION, TWEET } from "../queries/tweet";
import { act, fireEvent, render } from "@testing-library/react"; 
import { MemoryRouter } from "react-router-dom";

export const __mocks__:any= [
    {
      request: {
       query: TOGGLE_REACTION,
        variables: {
         
        },
        refetchQueries: [{ query: TWEET, variables: { id:"cl084xdy815761s0n5omoxoem0" } }],
      },
      result: {
        data: {
          mentions:[]
        ,
        },
        errors: "An error occurred",
      },
  }
  ]

const Tweet: any = {
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
};

test("Jest works", () => {
  expect(true).toBeTruthy();
});

// test("renders correctly", async () => {
//   const component = renderer.create(
//     //   <MockedProvider mocks={__mocks__} addTypename={false}>
//     <ShowTweet tweet={Tweet} />
//     //   </MockedProvider>,
//   );

//   await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
//   // expect(tree).toContain('An error occurred');

//   // const tree = renderer.create(
//   //   <Notifications/>
//   // ).toJSON();
//   // expect(tree).toMatchSnapshot();
// });


test("it should ...", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
       <ShowTweet tweet={Tweet} />
      </MockedProvider>,{wrapper: MemoryRouter}
    );
  });
  expect(rendered).toMatchSnapshot();
});

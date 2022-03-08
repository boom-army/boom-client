import React from "react";
import { ShowTweet } from "../../../components/Tweet/Tweet";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
// import { MentionsDocument, Tweet } from "../../../generated/graphql";
import { TWEET } from "../../../queries/tweet/index";

// export const __mocks__:any= [
//     {
//       request: {
//        query: TWEET,
//         variables: {
//           offset: 0,
//           limit: 10,
//         },
//       },
//       result: {
//         data: {
//           mentions:[]
//         ,
//         },
//         errors: "An error occurred",
//       },
//   }
//   ]

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

it("Jest works", () => {
  expect(true).toBeTruthy();
});

it("renders correctly", async () => {
  const component = renderer.create(
    //   <MockedProvider mocks={__mocks__} addTypename={false}>
    <ShowTweet tweet={Tweet} />
    //   </MockedProvider>,
  );

  await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // expect(tree).toContain('An error occurred');

  // const tree = renderer.create(
  //   <Notifications/>
  // ).toJSON();
  // expect(tree).toMatchSnapshot();
});

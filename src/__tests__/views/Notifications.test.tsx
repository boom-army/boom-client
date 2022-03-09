import React from "react";
import { Notifications } from "../../views/Notifications";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { MentionsDocument } from "../../generated/graphql";

// export const __mocks__: any = [
//   {
//     request: {
//       query: MentionsDocument,
//       variables: {
//         offset: 0,
//         limit: 10,
//       },
//     },
//     result: {
//       data: {
//         mentions: [],
//       },
//       errors: "An error occurred",
//     },
//   },
// ];

// it("renders correctly", async () => {
//   const component = renderer.create(
//     <MockedProvider mocks={__mocks__} addTypename={false}>
//       <Notifications />
//     </MockedProvider>
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

// it('displays a loading message when fetching', () => {
//   const component = renderer.create(
//     <MockedProvider mocks={__mocks__} addTypename={false}>
//       <Notifications/>
//     </MockedProvider>,
//   );

//   const tree = component.toJSON();
//   expect(tree).toContain('Loading...');
// });

const data:any= {"data":{"mentions":[{"id":"ckzz3yhuu3478401mnf2zgolb2","text":"Hey @sweet-sky-0445 - is this your first meep! congratulations!!\n","tags":[],"isTweetMine":false,"commentsCount":0,"retweetsCount":0,"isRetweet":false,"tipsCount":"0","reactions":[],"files":[],"user":{"id":"cku97qp1a000301mpyoptpo8e","avatar":"https://i1.sndcdn.com/artworks-gUNkngEJ7WTd043w-kpLWPQ-t500x500.jpg","publicAddress":"BhdKDqh8fMxd9L3ewkBTnZtF22BbTpqZNJxUpJP4W51P","handle":"quiet-salad","consumerName":"QS","__typename":"User"},"createdAt":"1645593628134","__typename":"Tweet"}]}}

it('displays a loading message when fetching', () => {
  const component = renderer.create(
    // <MockedProvider mocks={__mocks__} addTypename={false}>
      <Notifications/>
    // </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
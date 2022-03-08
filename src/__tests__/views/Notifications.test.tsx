import React from "react";
import { Notifications } from "../../views/Notifications";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { MentionsDocument } from "../../generated/graphql";

export const __mocks__: any = [
  {
    request: {
      query: MentionsDocument,
      variables: {
        offset: 0,
        limit: 10,
      },
    },
    result: {
      data: {
        mentions: [],
      },
      errors: "An error occurred",
    },
  },
];

it("Jest works", () => {
  expect(true).toBeTruthy();
});

it("renders correctly", async () => {
  const component = renderer.create(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <Notifications />
    </MockedProvider>
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

// it('displays a loading message when fetching', () => {
//   const component = renderer.create(
//     <MockedProvider mocks={__mocks__} addTypename={false}>
//       <Notifications/>
//     </MockedProvider>,
//   );

//   const tree = component.toJSON();
//   expect(tree).toContain('Loading...');
// });

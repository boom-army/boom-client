import React from "react";
import { AppHeader } from "../../../components/AppHeader/index";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import { FEED } from "../../../queries/others";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../../queries/auth";
import { USER_FOLLOW } from "../../../queries/follow";
import { UserContext } from "../../../contexts/user";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useMutation } from "@apollo/client";

it("Jest works", () => {
  expect(true).toBeTruthy();
});

// it('renders a snapshot', () => {
//     const tree = renderer.create(<AppHeader/>).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// it('should render ', async () => {
//     const Mock = {
//       request: {
//         query:
//         variables: { name: 'Buck' },
//       },
//       result: {
//         data: { dog: { id: 1, name: 'Buck', breed: 'poodle' } },
//       },
//     };

//     const component = renderer.create(
//       <MockedProvider mocks={[Mock]} addTypename={false}>
//         <Dog name="Buck" />
//       </MockedProvider>,
//     );

//     await new Promise(resolve => setTimeout(resolve, 0));

//     const p = component.root.findByType('p');
//     expect(p.children.join('')).toContain('Buck is a poodle');
//   });

import React from "react";
import { AppHeader } from "../../../components/AppHeader/index";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// import { DELETE_AppHeader } from "../../../queries/AppHeader";
import { MockedProvider } from "@apollo/client/testing";

let user: any = {
  id: "ckzny1iv10031lmn568gj3b3n",
  publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
  avatar: "",
  handle: "shy-cloud-4965",
  consumerName: "shy-cloud-4965",
  __typename: "User",
};

// export const __mocks__: any = [
//   {
//     request: {
//       query:,
//       variables: {
//         id:"cl084xdy815761s0n5omoxoem0"
//       },
//     },
//     result: {
//       data: {

//       },

//     },
//   },
// ];

describe("<AppHeader/> component :", () => {
  test("display <AppHeader/> component ", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        // <MockedProvider mocks={__mocks__} addTypename={false}>
        //   <SnackbarProvider>
        <AppHeader />
        //   </SnackbarProvider>
        // </MockedProvider>,
        // { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});

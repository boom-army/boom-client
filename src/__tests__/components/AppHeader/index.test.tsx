import React from "react";
import { AppHeader } from "../../../components/AppHeader/index";
import { act, fireEvent, render,screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { MockedProvider } from "@apollo/client/testing";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../../../queries/auth";
import { USER_FOLLOW } from "../../../queries/follow";

let user: any = {
  id: "ckzny1iv10031lmn568gj3b3n",
  publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
  avatar: "",
  handle: "shy-cloud-4965",
  consumerName: "shy-cloud-4965",
  __typename: "User",
};

export const __mocks__: any = [
  {
    request: {
      query: PUBLIC_ADDRESS,
      variables: {},
    },
    result: {
      data: {},
      errors: "An error occurred",
    },
  },
];

describe("<AppHeader/> component :", () => {
  test("display <AppHeader/> component ", async () => {

    //snapshot testing 
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <SnackbarProvider>
            <AppHeader />
          </SnackbarProvider>
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
   
});

//assertion testing

test("Assertion testing of <AppHeader/> component ", async () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <AppHeader />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );
  expect(screen.getByText('Boom β')).toBeInTheDocument();

  expect(screen.getByText('Select Wallet')).toBeInTheDocument();

  expect(screen.getByRole('link', { name: 'Boom β' })).toHaveAttribute('href', '/')
});
});



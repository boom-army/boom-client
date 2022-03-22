import React from "react";
import { App } from "../App";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// import { MentionsDocument, Tweet } from "../../../generated/graphql";

import { FEED } from "../queries/others";
import { PUBLIC_ADDRESS, LOGIN_REGISTER } from "../queries/auth";
import { USER_FOLLOW } from "../queries/follow";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";

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

test("renders a snapshot testing ...", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </MockedProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});

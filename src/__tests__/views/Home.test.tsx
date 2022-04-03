import React from "react";
import { Home } from "../../views/Home";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FeedDocument } from "../../generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { SnackbarProvider } from "notistack";

export const __mocks__: any = [
  {
    request: {
      query: FeedDocument,
      variables: {},
    },
    result: {
      data: {
        mentions: [],
      },
      errors: "An error occurred",
    },
  },
];

describe("<Home/> component :", () => {
  test("display <Home/> component ", async () => {
    let rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <Home />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

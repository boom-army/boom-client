import { App } from "../App";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

test("Assertion testing of <Suggestion/> component", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </MockedProvider>
    );
  });
  expect(screen.getByRole("link", { name: "Boom β" })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByRole("link", { name: "Community" })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByRole("heading", { name: "Boom β" })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Select Wallet" })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "" })).toHaveAttribute(
    "placeholder",
    "What's happening?"
  );
});

import React from "react";
import Logout from "../../../components/Auth/Logout";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

describe("<Logout/> component :", () => {
  test("display <Logout/> component ", async () => {
    let rendered = render(
      <SnackbarProvider>
        <Logout />
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of  <Logout/> component ", async () => {
  render(
    <SnackbarProvider>
      <Logout />
    </SnackbarProvider>
  );
  expect(screen.getByText("Logout")).toBeInTheDocument();
});

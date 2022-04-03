import React from "react";
import { CurrentUser } from "../../../components/CurrentUser/index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<CurrentUser/> component :", () => {
  test("display <CurrentUser/> component ", async () => {
    let rendered = render(<CurrentUser />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of  <CurrentUser/> component ", async () => {
  render(<CurrentUser />, { wrapper: MemoryRouter });
  expect(screen.getByRole("link", { name: "Boom β" })).toHaveAttribute(
    "href",
    "/"
  );
});

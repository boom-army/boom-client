import React from "react";
import { Explore } from "../../views/Explore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
        // includeStyles: false 
  }
));


describe("<Explore/> component :", () => {
  test("display <Explore/> component ", async () => {
    let rendered = render(
      <SnackbarProvider>
        <Explore />
      </SnackbarProvider>,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of <Explore/> component", () => {
  render(
    <SnackbarProvider>
      <Explore />
    </SnackbarProvider>,
    { wrapper: MemoryRouter }
  );
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

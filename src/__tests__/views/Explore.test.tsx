import React from "react";
import { Explore } from "../../views/Explore";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

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

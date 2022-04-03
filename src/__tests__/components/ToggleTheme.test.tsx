import React from "react";
import ToggleTheme from "../../components/ToggleTheme";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<ToggleTheme/> component :", () => {
  test("display <ToggleTheme/> component ", async () => {
    let rendered = render(<ToggleTheme />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

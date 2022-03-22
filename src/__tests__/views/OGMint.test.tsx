import React from "react";
import { OGMint } from "../../views/OGMint";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<OGMint/> component :", () => {
  test("display <OGMint/> component ", async () => {
    let rendered = render(<OGMint />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

import React from "react";
import { ChangeColor } from "../../components/ChangeColor";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<ChangeColor/> component :", () => {
  test("display <ChangeColor/> component ", async () => {
    let rendered = render(<ChangeColor />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

import React from "react";
import Input from "../../components/Input";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<Input/> component :", () => {
  test("display <Input/> component ", async () => {
    let rendered = render(<Input />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

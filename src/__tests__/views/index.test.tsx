import React from "react";
import { ChangeColor } from "../../components/ChangeColor";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
        // includeStyles: false 
  }
));


describe("<ChangeColor/> component :", () => {
  test("display <ChangeColor/> component ", async () => {
    let rendered = render(<ChangeColor />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of <ChangeColor/> component", () => {
  render(<ChangeColor />, { wrapper: MemoryRouter });
  expect(screen.getByText("Color")).toBeInTheDocument();
});

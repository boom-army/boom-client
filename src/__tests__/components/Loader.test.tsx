import React from "react";
import { Loader } from "../../components/Loader";
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


describe("<Loader/> component :", () => {
  test("display <Loader/> component ", async () => {
    let rendered = render(<Loader />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of <Loader/> component", () => {
  render(<Loader />, { wrapper: MemoryRouter });
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

import React from "react";
import { MorePopUp } from "../../components/MorePopup";
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


describe("<MorePopup/> component :", () => {
  test("display <MorePopup/> component ", async () => {
    let rendered = render(<MorePopUp />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of <MorePopup/>  component", () => {
  render(<MorePopUp />, { wrapper: MemoryRouter });
  expect(screen.getByText("More")).toBeInTheDocument();
});

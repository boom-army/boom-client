import React from "react";
import { SearchModal } from "../../../components/Giphy/SearchModal";
import { act, fireEvent, render, screen } from "@testing-library/react";

let setGif: any = "";

describe("<SearchModal/> component :", () => {
  test("display <SearchModal/> component  when Search result found ", async () => {
    let rendered = render(<SearchModal setGif={setGif} />);
    expect(rendered).toMatchSnapshot();
  });
});
test("Assertion testing of <SearchModal/>  component when Search result found", async () => {
  render(<SearchModal setGif={setGif} />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

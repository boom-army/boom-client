import React from "react";
import { SearchModalHeader } from "../../../components/Giphy/SearchModalHeader";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
        // includeStyles: false 
  }
));

let setIsLoading: any = false;
let setInput: any = "";
let handleClose: any;

describe("<SearchModalHeader/> component :", () => {
  test("display <SearchModalHeader/> component  when Search result found ", async () => {
    let rendered = render(
      <SearchModalHeader
        input={"anger"}
        setIsLoading={setIsLoading}
        setInput={setInput}
        handleClose={handleClose}
      />
    );
    expect(rendered).toMatchSnapshot();
  });

  test("display <SearchModalHeader/> component  when Search result found ", async () => {
    let rendered = render(
      <SearchModalHeader
        input={"anger"}
        setIsLoading={setIsLoading}
        setInput={setInput}
        handleClose={handleClose}
      />
    );
    fireEvent.click(rendered.getByPlaceholderText("Search"));
    expect(rendered.asFragment()).toMatchSnapshot();
  });
});

test("Assertion testing of<SearchModalHeader/> component ", () => {
  render(
    <SearchModalHeader
      input={"anger"}
      setIsLoading={setIsLoading}
      setInput={setInput}
      handleClose={handleClose}
    />
  );
  expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
  expect(screen.getByText("Search for gif")).toBeInTheDocument();
});

import React from "react";
import { SearchModalHeader } from "../../../components/Giphy/SearchModalHeader";
import { act, fireEvent, render } from "@testing-library/react";

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

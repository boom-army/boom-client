import React from "react";
import { ImageSuggestionGrid } from "../../../components/Giphy/ImageSuggestionGrid";
import { act, fireEvent, render, screen } from "@testing-library/react";

let setIsLoading: any = false;
let setInput: any = "";

describe("<ImageSuggestionGrid/> component :", () => {
  test("display <ImageSuggestionGrid/> component  when ImageSuggestion have list", async () => {
    let rendered = render(
      <ImageSuggestionGrid setInput={setInput} setIsLoading={setIsLoading} />
    );
    expect(rendered).toMatchSnapshot();
  });
});


import React from "react";
import { ImageSuggestionGrid } from "../../../components/Giphy/ImageSuggestionGrid";
import { act, fireEvent, render } from "@testing-library/react";

let setIsLoading: any = false;
let setInput: any = "";

describe("<ImageSuggestionGrid/> component :", () => {
  // test("display <ImageSuggestionGrid/> component when gifArr undefined", () => {
  //   let rendered = render(<ImageSuggestionGrid gifArr={[]}
  //     setGif={gif}
  //     setOpen={false}
  //     isLoadingMore={false} />);
  //   expect(rendered).toMatchSnapshot();
  // });

  // test("display <ImageSuggestionGrid/> component  when loading", async () => {
  //   let rendered = render(<ImageSuggestionGrid gifArr={data}
  //     setGif={gif}
  //     setOpen={false}
  //     isLoadingMore={true} />);
  //   expect(rendered).toMatchSnapshot();
  // });

  test("display <ImageSuggestionGrid/> component  when ImageSuggestion have list", async () => {
    let rendered = render(
      <ImageSuggestionGrid setInput={setInput} setIsLoading={setIsLoading} />
    );
    expect(rendered).toMatchSnapshot();
  });
});

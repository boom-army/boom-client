import React from "react";
import { ImageSuggestionGrid } from "../../../components/Giphy/ImageSuggestionGrid";
import { act, fireEvent, render , screen} from "@testing-library/react";

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

test("Assertion testing of <ImageSuggestionGrid/>  component  when ImageSuggestion have list", async () => {
 
  render(
    <ImageSuggestionGrid setInput={setInput} setIsLoading={setIsLoading} />);

    // expect(screen.getByRole('listitem')).toBeInTheDocument();
    // expect(screen.getByRole('list')).toBeInTheDocument();
    // expect(screen.getByRole('img', { name: 'Deal with it' })).toHaveAttribute('src', 'https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.gif&ct=g');
    
   });
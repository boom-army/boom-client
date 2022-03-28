import React from "react";
import { EmojiPicker } from "../../../components/Emojis/EmojiPicker";
import { act, fireEvent, render} from "@testing-library/react";

describe("<EmojiPicker/> component :", () => {
  test("display <EmojiPicker/> component ", async () => {
    let rendered = render(<EmojiPicker />);
    expect(rendered).toMatchSnapshot();
  });
});
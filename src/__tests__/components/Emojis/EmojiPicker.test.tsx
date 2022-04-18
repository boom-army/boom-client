import React from "react";
import { EmojiPicker } from "../../../components/Emojis/EmojiPicker";
import { act, fireEvent, render } from "@testing-library/react";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
        // includeStyles: false 
  }
));


describe("<EmojiPicker/> component :", () => {
  test("display <EmojiPicker/> component ", async () => {
    let rendered = render(<EmojiPicker />);
    expect(rendered).toMatchSnapshot();
  });
});

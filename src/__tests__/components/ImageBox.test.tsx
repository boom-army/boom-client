import React from "react";
import { ImageBox } from "../../components/ImageBox";
import { act, fireEvent, render } from "@testing-library/react";
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


describe("<ImageBox/> component :", () => {
  test("display <ImageBox/> component ", async () => {
    let rendered = render(<ImageBox files={[]} />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

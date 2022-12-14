import React from "react";
import { ImageBox } from "../../components/Lightbox/ImageBox";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<ImageBox/> component :", () => {
  test("display <ImageBox/> component ", async () => {
    let rendered = render(<ImageBox files={[]} />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

import React from "react";
import { ImageBox } from "../../components/ImageBox";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<ImageBox/> component :", () => {
  test("display <ImageBox/> component ", async () => {
    let rendered = render(
      <ImageBox
      />,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

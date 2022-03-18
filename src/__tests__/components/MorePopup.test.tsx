import React from "react";
import { MorePopUp } from "../../components/MorePopup";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<MorePopup/> component :", () => {
  test("display <MorePopup/> component ", async () => {
    let rendered = render(
      <MorePopUp
      />,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

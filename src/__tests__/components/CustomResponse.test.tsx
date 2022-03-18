import React from "react";
import { CustomResponse } from "../../components/CustomResponse";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<CustomResponse/> component :", () => {
  test("display <CustomResponse/> component ", async () => {
    let rendered = render(
      <CustomResponse
      />,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

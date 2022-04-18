import React from "react";
import { CustomResponse } from "../../components/CustomResponse";
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


describe("<CustomResponse/> component :", () => {
  test("display <CustomResponse/> component ", async () => {
    let rendered = render(<CustomResponse />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

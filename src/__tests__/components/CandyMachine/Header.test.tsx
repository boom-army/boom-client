import React from "react";
import { Header } from "../../../components/CandyMachine/Header";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
        // includeStyles: false 
  }
));


describe("<Header/> component :", () => {
  test("display <Header/> component ", async () => {
    let rendered = render(
      <SnackbarProvider>
        <Header />
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});

import React from "react";
import { Header } from "../../../components/CandyMachine/Header";
import { act, fireEvent, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

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

import React from "react";
import { MintCountdown } from "../../../components/CandyMachine/MintCountdown";
import { act, fireEvent, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

describe("<MintCountDown/> component :", () => {
  test("display <MintCountDown/> component ", async () => {
    Date.now = jest.fn(() => 1482363367071);
    let rendered = render(
      <SnackbarProvider>
        <MintCountdown date={new Date(Date.now())} />
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});

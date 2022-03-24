import React from "react";
import { MintCountdown } from "../../../components/CandyMachine/MintCountdown";
import { act, fireEvent, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

describe("<MintCountDown/> component :", () => {
  test("display <MintCountDown/> component ", async () => {
    let rendered = render(
      <SnackbarProvider>
        <MintCountdown date={new Date()} />
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});

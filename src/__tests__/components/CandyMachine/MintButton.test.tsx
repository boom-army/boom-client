import React from "react";
import { MintButton } from "../../../components/CandyMachine/MintButton";
import { act, fireEvent, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

describe("<MintButton/> component :", () => {
  test("display <MintButton/> component ", async () => {
    let rendered = render(
      <SnackbarProvider>
        {/* <MintButton  onMint={} isMinting={true}/> */}
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});

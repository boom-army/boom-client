import React from "react";
import { MintButton } from "../../../components/CandyMachine/MintButton";
import { act, fireEvent, render } from "@testing-library/react";
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


describe("<MintButton/> component :", () => {
  test("display <MintButton/> component when isMinting true", async () => {
    let rendered = render(
      <SnackbarProvider>
        <MintButton onMint={jest.fn()} isMinting={true} />
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
  test("display <MintButton/> component when isMinting false ", async () => {
    let rendered = render(
      <SnackbarProvider>
        <MintButton onMint={jest.fn()} isMinting={false} />
      </SnackbarProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});

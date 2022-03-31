import React from "react";
import { OGMint } from "../../views/OGMint";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("<OGMint/> component :", () => {
  test("display <OGMint/> component ", async () => {
    let rendered = render(<OGMint />, { wrapper: MemoryRouter });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of  <OGMint/> component", () => {
  render(<OGMint />, { wrapper: MemoryRouter });
  expect(screen.getByRole("img", { name: "Boom OG NFT Mint" })).toHaveAttribute(
    "src",
    "/assets/boom-og.png"
  );
  expect(screen.getByRole("img", { name: "1303 OG NFT Card" })).toHaveAttribute(
    "src",
    "/assets/inner.png"
  );
  expect(screen.getByRole("img", { name: "Minting Schedule" })).toHaveAttribute(
    "src",
    "/assets/minting.png"
  );
  expect(
    screen.getByRole("button", { name: "Connect Wallet" })
  ).toBeInTheDocument();
});

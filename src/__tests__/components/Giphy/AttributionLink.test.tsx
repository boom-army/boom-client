import React from "react";
import { AttributionLink } from "../../../components/Giphy/AttributionLink";
import { act, fireEvent, render, screen } from "@testing-library/react";

test("<AttributionLink/> component  Snapshot testing ...", async () => {
  let rendered = render(<AttributionLink src={"https://abc.com"} />);
  expect(rendered).toMatchSnapshot();
});

test("Assertion testing of <AttributionLink/>  component ", async () => {
  render(<AttributionLink src={"https://abc.com"} />);
  expect(
    screen.getByRole("link", { name: "Powered by Giphy" })
  ).toHaveAttribute("href", "https://abc.com");
  expect(screen.getByRole("img", { name: "Powered by Giphy" })).toHaveAttribute(
    "src",
    "/assets/giphy-dark.png"
  );
});

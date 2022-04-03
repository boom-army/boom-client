import React from "react";
import { AttributionLink } from "../../../components/Giphy/AttributionLink";
import { act, fireEvent, render } from "@testing-library/react";

test("<AttributionLink/> component  Snapshot testing ...", async () => {
  let rendered = render(<AttributionLink src={"https://abc.com"} />);
  expect(rendered).toMatchSnapshot();
});

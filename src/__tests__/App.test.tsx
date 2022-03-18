import React from "react";
import { App } from "../App";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// describe("<Home/> component :", () => {
//   test("display <Home/> component ", async () => {
//     let rendered = render(
//       <Home
//       />,
//       { wrapper: MemoryRouter }
//     );
//     expect(rendered).toMatchSnapshot();
//   });
// });

test('renders a snapshot', () => {
  const tree = render(<App/>)
  expect(tree).toMatchSnapshot();
});


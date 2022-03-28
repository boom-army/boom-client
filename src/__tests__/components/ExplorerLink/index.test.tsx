import React from "react";
import { ExplorerLink } from "../../../components/ExplorerLink";
import { act, fireEvent, render, screen} from "@testing-library/react";

describe("<ExplorerLink/> component :", () => {
  test("display <ExplorerLink/> component ", async () => {
    let rendered = render(
      <ExplorerLink
        address={"JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4"}
        type={"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"}
        code={true}
        length={8}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of <ExplorerLink/>  component ", async () => {
  render(
    <ExplorerLink
      address={"JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4"}
      type={"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"}
      code={true}
      length={8}
    />
  );
  expect(screen.getByRole('link', { name: 'JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4' })).toHaveAttribute('href', 'https://explorer.solana.com/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA/JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4');
  expect(screen.getByText('JBZ52cKh...')).toBeInTheDocument();
});

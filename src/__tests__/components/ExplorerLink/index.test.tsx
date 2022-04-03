import React from "react";
import { ExplorerLink } from "../../../components/ExplorerLink";
import { act, fireEvent, render } from "@testing-library/react";

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

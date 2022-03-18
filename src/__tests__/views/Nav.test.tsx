import React from "react";
import  { Nav } from "../../views/Nav";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

let user:any =   {
    id: "ckzny1iv10031lmn568gj3b3n",
    publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
    avatar: "",
    handle: "shy-cloud-4965",
    consumerName: "shy-cloud-4965",
    __typename: "User",
  }

describe("<Nav/> component :", () => {
  test("display <Nav/> component ", async () => {
    let rendered = render(
      <Nav
      newMentionsCount={1} 
      user={user}
      />,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

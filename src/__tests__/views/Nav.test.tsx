import React from "react";
import { Nav } from "../../views/Nav";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

let user: any = {
  id: "ckzny1iv10031lmn568gj3b3n",
  publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
  avatar: "",
  handle: "shy-cloud-4965",
  consumerName: "shy-cloud-4965",
  __typename: "User",
};

describe("<Nav/> component :", () => {
  test("display <Nav/> component ", async () => {
    let rendered = render(<Nav newMentionsCount={1} user={user} />, {
      wrapper: MemoryRouter,
    });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of <Nav/> component", () => {
  render(<Nav newMentionsCount={1} user={user} />, {
    wrapper: MemoryRouter,
  });

  expect(screen.getByRole("link", { name: "Community" })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByRole("link", { name: "Mint NFT" })).toHaveAttribute(
    "href",
    "/mint-nft"
  );
  expect(screen.getByRole("link", { name: "Creators" })).toHaveAttribute(
    "href",
    "/connect"
  );
  expect(screen.getByRole("link", { name: "1 Notifications" })).toHaveAttribute(
    "href",
    "/notifications"
  );
  expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
    "href",
    "/shy-cloud-4965"
  );
});

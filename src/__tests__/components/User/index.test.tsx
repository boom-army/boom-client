import React from "react";
import { User } from "../../../components/User/index";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
       // includeStyles: false 
  }
));

const data: any = {
  id: "ckzny1iv10031lmn568gj3b3n",
  handle: "shy-cloud-4965",
  avatar: "",
  isFollowing: false,
  isSelf: true,
  consumerName: "shy-cloud-4965",
  bio: "full stack developer",
  __typename: "User",
};

describe("<user/>", () => {
  test("renders the component", () => {
    const container = render(<User user={data} />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});

test("Assertion testing of <user/> component", () => {
  render(<User user={data} />, { wrapper: MemoryRouter });

  expect(screen.getByRole("button", { name: "delete" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "" })).toHaveAttribute(
    "href",
    "/settings/profile"
  );
});

import React from "react";
import { User } from "../../../components/User/index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";

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

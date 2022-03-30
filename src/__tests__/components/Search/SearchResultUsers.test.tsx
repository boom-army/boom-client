import React from "react";
import { User as UserProps } from "../../../generated/graphql";
import SearchResultUsers from "../../../components/Search/SearchResultUsers";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const users = {
  searchByUser: [
    {
      id: "ckzny1iv10031lmn568gj3b3n",
      handle: "shy-cloud-4965",
      avatar: "",
      isFollowing: false,
      isSelf: true,
      consumerName: "shy-cloud-4965",
      bio: "full stack developer",
      __typename: "User",
    },
  ],
};

describe("Search Users:", () => {
  test("display <searchResultUsers/> component when users undefined", () => {
    const tree = render(
      <SearchResultUsers loading={false} users={undefined} />
    );

    expect(tree).toMatchSnapshot();
  });

  test("display <searchResultUsers/> component when users loading", () => {
    const tree = render(<SearchResultUsers loading={true} users={undefined} />);

    expect(tree).toMatchSnapshot();
  });

  test("display <searchResultUsers/> component when users not found", () => {
    const tree = render(<SearchResultUsers loading={false} users={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test("display <searchResultUsers/> component when users list found", () => {
    const tree = render(<SearchResultUsers loading={false} users={users} />, {
      wrapper: MemoryRouter,
    });
    expect(tree).toMatchSnapshot();
  });
});

test("Assertion testing of <searchResultUsers/> component", () => {
 
  render(
    <SearchResultUsers loading={false} users={users} />,
  { wrapper: MemoryRouter }
  );

     expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
  
 });
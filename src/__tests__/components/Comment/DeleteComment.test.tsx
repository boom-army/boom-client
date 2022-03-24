import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SnackbarProvider } from "notistack";
import { DELETE_COMMENT } from "../../../queries/comment";
import DeleteComment from "../../../components/Comment/DeleteComment";

const values = {
  handle: "shy-cloud-4965",
  bio: "full stack developer",
  consumerName: "shy-cloud-4965",
  coverPhoto: "/default-cover.png",
  dob: "d",
  location: "",
  website: "abcdfd",
};

export const __mocks__: any = [
  {
    request: {
      query: DELETE_COMMENT,
      variables: {
        id: "cl084xdy815761s0n5omoxoem0",
      },
    },
    result: {
      data: {},
    },
  },
];

describe("<DeleteComponent/>: ", () => {
  test("renders correctly when User have profile", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <SnackbarProvider>
            <DeleteComment id={"cl084xdy815761s0n5omoxoem0"} />
          </SnackbarProvider>
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});

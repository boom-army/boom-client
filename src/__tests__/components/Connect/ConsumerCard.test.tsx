import React from "react";
import { ConsumerCard } from "../../../components/Connect/ConsumerCard";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { USERS } from "../../../queries/follow/index";

const consumer = {
  id: "ckzny1iv10031lmn568gj3b3n",
  handle: "shy-cloud-4965",
  avatar: "",
  isFollowing: false,
  isSelf: true,
  coverPhoto: "https://my.sosol.app/default-cover.png",
  consumerName: "shy-cloud-4965",
  bio: "full stack developer",
  __typename: "User",
};

export const __mocks__: any = [
  {
    request: {
      query: USERS,
      variables: {
        offset: 0,
      },
    },
    result: {
      data: {
        users: [
          {
            id: "ckzny1iv10031lmn568gj3b3n",
            handle: "shy-cloud-4965",
            avatar: "",
            isFollowing: false,
            isSelf: true,
            coverPhoto: "https://my.sosol.app/default-cover.png",
            consumerName: "shy-cloud-4965",
            bio: "full stack developer",
            __typename: "User",
          },
          {
            avatar: "",
            bio: "",
            consumerName: "shiny-silence-3873",
            coverPhoto: "https://my.sosol.app/default-cover.png",
            handle: "shiny-silence-3873",
            id: "cl0tpyv2k22515001mp1vbzhegs",
            isFollowing: false,
            isSelf: false,
            __typename: "User",
          },
        ],
      },
    },
  },
];

describe("<ConsumerCArd/> component :", () => {
  test("display <ConsumerCArd/> component ", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <SnackbarProvider>
            <ConsumerCard consumer={consumer} />
          </SnackbarProvider>
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of  <ConsumerCard/>  component ", async () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <ConsumerCard consumer={consumer} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );
  expect(
    screen.getByRole("img", { name: "shy-cloud-4965 cover photo" })
  ).toHaveAttribute("src", "https://my.sosol.app/default-cover.png");
});

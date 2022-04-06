import { Follow } from "../../../components/Profile/Follow";
import { MockedProvider } from "@apollo/client/testing";
import { FOLLOW } from "../../../queries/follow/index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

export const __mocks__: any = [
  {
    request: {
      query: FOLLOW,
      variables: {
        id: "ckzny1iv10031lmn568gj3b3n",
      },
    },
    result: {
      data: {
        mentions: [],
      },
      errors: "An error occurred",
    },
  },
];

test("display <follow/> component when isfollowing false ", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <Follow isFollowing={false} id={"ckzny1iv10031lmn568gj3b3n"} />
        </SnackbarProvider>
      </MockedProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});

test("display <follow/> component  When isfollowing true", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <Follow isFollowing={true} id={"ckzny1iv10031lmn568gj3b3n"} />
        </SnackbarProvider>
      </MockedProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});

test("Assertion testing of  <follow/> component  When isfollowing true", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <Follow isFollowing={true} id={"ckzny1iv10031lmn568gj3b3n"} />
      </SnackbarProvider>
    </MockedProvider>
  );

  expect(screen.getByTestId("PersonRemoveIcon")).toBeInTheDocument();
});

test("Assertion testing of  <follow/> component  When isfollowing false", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <Follow isFollowing={false} id={"ckzny1iv10031lmn568gj3b3n"} />
      </SnackbarProvider>
    </MockedProvider>
  );

  expect(screen.getByTestId("PersonAddIcon")).toBeInTheDocument();
  
});

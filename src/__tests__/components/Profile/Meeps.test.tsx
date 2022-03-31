import { Meeps } from "../../../components/Profile/Meeps";
import { MockedProvider } from "@apollo/client/testing";
import { TWEET } from "../../../queries/tweet/index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const profile: any = {
  data: {
    profile: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      avatar: "",
      coverPhoto: "/default-cover.png",
      dob: "",
      location: "",
      website: "",
      isSelf: true,
      isFollowing: false,
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 21,
      newMentionsCount: 0,
      bio: "full stack developer",
      tweets: [
        {
          id: "cl0c77yow71753s0n5h032nerw",
          text: "good scope.",
          tags: [],
          isTweetMine: true,
          user: {
            id: "ckzny1iv10031lmn568gj3b3n",
            consumerName: "shy-cloud-4965",
            publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
            handle: "shy-cloud-4965",
            avatar: "",
            __typename: "User",
          },
          files: [],
          gif: null,
          reactions: [],
          commentsCount: 0,
          retweetsCount: 0,
          isRetweet: false,
          tipsCount: "0",
          createdAt: "1646385168992",
          __typename: "Tweet",
        },
      ],
      createdAt: "1644918563773",
      __typename: "User",
    },
  },
};

const data: any = {
  data: {
    profile: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      avatar: "",
      coverPhoto: "/default-cover.png",
      dob: "",
      location: "",
      website: "",
      isSelf: true,
      isFollowing: false,
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 21,
      newMentionsCount: 0,
      bio: "full stack developer",
      tweets: [],
      createdAt: "1644918563773",
      __typename: "User",
    },
  },
};
export const __mocks__: any = [
  {
    request: {
      query: TWEET,
      variables: {
        id: "cl0c77yow71753s0n5h032nerw",
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

describe("display <Meep/> component", () => {
  test("User have Meep", async () => {
    profile.data.profile.tweets.map(
      (item: any) => (item.createdAt = Date.now().toString())
    );

    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <SnackbarProvider>
            <Meeps data={profile.data} />
          </SnackbarProvider>
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });

  test("User haven't Meeped yet", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <SnackbarProvider>
            <Meeps data={data.data} />
          </SnackbarProvider>
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});

test("Assertion testing of  <Meeps/> component, When user haven't Meeped yet", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <Meeps data={data.data} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );

  expect(screen.getByText("You haven't Meeped yet")).toBeInTheDocument();
});

test("Assertion testing of  <Meeps/> component, When user have Meep", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <Meeps data={profile.data} />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );
  expect(
    screen.getByRole("link", { name: "shy-cloud-4965 @shy-cloud-4965" })
  ).toHaveAttribute("href", "/shy-cloud-4965");
  expect(
    screen.getByRole("link", { name: "a few seconds ago" })
  ).toHaveAttribute(
    "href",
    "/shy-cloud-4965/status/cl0c77yow71753s0n5h032nerw"
  );
});

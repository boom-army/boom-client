import { EditProfile } from "../../../components/Profile/EditProfile";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SnackbarProvider } from "notistack";
import {
  useEditProfileMutation,
  EditProfileDocument,
} from "../../../generated/graphql";

const values = {
  handle: "shy-cloud-4965",
  bio: "full stack developer",
  consumerName: "shy-cloud-4965",
  coverPhoto: "/default-cover.png",
  dob: "d",
  location: "",
  website: "abcdfd",
};

const data = {
  data: {
    profile: {
      id: "ckzny1iv10031lmn568gj3b3n",
      publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
      handle: "shy-cloud-4965",
      consumerName: "shy-cloud-4965",
      avatar: "",
      coverPhoto: "/default-cover.png",
      dob: "d",
      location: "",
      website: "abcdfd",
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
        {
          id: "cl084xdy815761s0n5omoxoem0",
          text: "testing after changes in input converted to ts",
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
          reactions: [
            {
              id: "cl0c774p371312s0n533u0b29k",
              emojiId: "+1",
              skin: 1,
              isMine: true,
              count: 1,
              __typename: "Reaction",
            },
          ],
          commentsCount: 1,
          retweetsCount: 0,
          isRetweet: false,
          tipsCount: "0",
          createdAt: "1646139451616",
          __typename: "Tweet",
        },
        {
          id: "cl081ymfz8867s0n59y782hdj",
          text: "🥰",
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
          createdAt: "1646134470431",
          __typename: "Tweet",
        },
        {
          id: "cl06ku5qr9948ban5356ugu9b",
          text: "😍",
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
          createdAt: "1646045242515",
          __typename: "Tweet",
        },
        {
          id: "ckzzg3lm6169405vun5im00fsmq",
          text: "😘6210",
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
          createdAt: "1645614021678",
          __typename: "Tweet",
        },
      ],
      createdAt: "1644918563773",
      __typename: "User",
    },
  },
};

const error = {
  message: "An error occured",
};

export const __mocks__: any = [
  {
    request: {
      query: EditProfileDocument,
      variables: {
        values,
      },
    },
    result: {
      data: {
        editProfile: {
          id: "ckzny1iv10031lmn568gj3b3n",
          handle: "shy-cloud-4965",
          publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
          __typename: "User",
        },
      },
      // errors: "An error occurred",
    },
  },
];

describe("Edit Profile : ", () => {
  test("renders correctly when User have profile", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <SnackbarProvider>
            <EditProfile data={data.data} loading={false} />
          </SnackbarProvider>
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });

  test("renders correctly when profile loading", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
          <EditProfile data={data.data} loading={true && "true"} />
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});

describe("Edit Profile : ", () => {
  test("Assertion testing when User have profile", async () => {
    render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <EditProfile data={data.data} loading={false} />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByText("Handle")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "cover" })).toHaveAttribute(
      "src",
      "/default-cover.png"
    );
  });

  test("Assertion testing when profile loading", async () => {
    render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <EditProfile data={data.data} loading={true && "true"} />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

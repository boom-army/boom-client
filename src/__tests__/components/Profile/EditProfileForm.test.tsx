import { ProfileDocument } from "../../../generated/graphql";
import React from "react";
import { EditProfileForm } from "../../../components/Profile/EditProfileForm";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
// import {render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import {
  useEditProfileMutation,
  EditProfileDocument,
} from "../../../generated/graphql";
// import { MockedProvider } from '@apollo/react-testing'

const values = {
  handle: "shy-cloud-4965",
  bio: "full stack developer",
  consumerName: "shy-cloud-4965",
  coverPhoto: "/default-cover.png",
  dob: "d",
  location: "",
  website: "abcdfd",
};

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

// describe("useHome", () => {
//   describe("handleClientChanged", () => {
//     it("should  navigate to a new client page", () => {
//       const  tree  = render(<EditProfileForm profile={profile.data.profile} />);
//       expect(tree).toMatchSnapshot();
//     });
//   });
// });

test("it should ...", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
       <EditProfileForm profile={profile.data.profile} />
      </MockedProvider>,{wrapper: MemoryRouter}
    );
  });
  expect(rendered).toMatchSnapshot();
});

// describe("Edit Profile : ", () => {
//   test("renders correctly when User have profile", () => {

//     const tree = render(
//       // <MockedProvider addTypename={false} >
//       <EditProfileForm profile={profile.data.profile} />,{wrapper: MemoryRouter});

//     // </MockedProvider>
//     // .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

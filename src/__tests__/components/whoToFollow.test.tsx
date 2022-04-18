import { WhoToFollow } from "../../components/WhoToFollow";
import { USER_FOLLOW } from "../../queries/follow/index";
import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
      // includeStyles: false 
  }
));


export const __mocks__: any = [
  {
    request: {
      query: USER_FOLLOW,
      variables: {},
    },
    result: {
      data: {
        userFollow: [
          {
            id: "ckw9sa47c49518701mx94vlqz9l",
            handle: "Moona-boom",
            avatar:
              "https://sosol-prod.s3.us-west-2.amazonaws.com/PicsArt_11-26-04.04.41.jpg",
            isFollowing: false,
            isSelf: false,
            consumerName: "Moona.Boom",
            bio: "Mod Channel Indonesia in Boom.army\n",
            __typename: "User",
          },
          {
            id: "cl0jic9f01100701muas59xjp0",
            handle: "long-sound-4844",
            avatar: "",
            isFollowing: false,
            isSelf: false,
            consumerName: "long-sound-4844",
            bio: "",
            __typename: "User",
          },
          {
            id: "cl0idvhzs5821401momu307421",
            handle: "purple-rice-3322",
            avatar: "",
            isFollowing: false,
            isSelf: false,
            consumerName: "purple-rice-3322",
            bio: "",
            __typename: "User",
          },
          {
            id: "cl0ic2euo971701moa6bl5od5",
            handle: "withered-base-4024",
            avatar: "",
            isFollowing: false,
            isSelf: false,
            consumerName: "withered-base-4024",
            bio: "",
            __typename: "User",
          },
        ],
      },
    },
  },
];

test("display <WhoToFollow /> component", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <WhoToFollow />
      </MockedProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});

test("Assertion testing of <WhoToFollow /> component", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <WhoToFollow />
    </MockedProvider>
  );
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

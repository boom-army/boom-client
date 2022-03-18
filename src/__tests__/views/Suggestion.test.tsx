import React from "react";
import { Suggestion } from "../../views/Suggestion";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { USER_FOLLOW } from "../../queries/follow/index";
import { MockedProvider } from "@apollo/client/testing";
// import {render, screen} from '@testing-library/react'


export const __mocks__: any = [
  {
    request: {
      query: USER_FOLLOW,
      variables: {
        // id: 'ckzny1iv10031lmn568gj3b3n'
      },
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

describe("<Suggestion/> component :", () => {
  test("display <Suggestion/> component ", async () => {
    let rendered = render(
        <MockedProvider mocks={__mocks__} addTypename={false}>
      <Suggestion
      />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(rendered).toMatchSnapshot();
  });
});

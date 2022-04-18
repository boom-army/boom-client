import React from "react";
import { ParentTweet } from "../../../components/Tweet/ParentTweet";
import { TOGGLE_REACTION, TWEET } from "../../../queries/tweet/index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
      query: TOGGLE_REACTION,
      variables: {},
      refetchQueries: [
        { query: TWEET, variables: { id: "cl084xdy815761s0n5omoxoem0" } },
      ],
    },
    result: {
      data: {
        mentions: [],
      },
      errors: "An error occurred",
    },
  },
];

test("parent tweet snapshot testing", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <ParentTweet parentTweet={"cl084xdy815761s0n5omoxoem0"} />,

      { wrapper: MemoryRouter }
    );
  });
  expect(rendered).toMatchSnapshot();
});

test("Assertion testing of <ParentTweet/> component", () => {
  render(<ParentTweet parentTweet={"cl084xdy815761s0n5omoxoem0"} />, {
    wrapper: MemoryRouter,
  });
  expect(
    screen.getByRole("link", { name: "Go up thread to parent ⤴" })
  ).toHaveAttribute("href", "/undefined/status/cl084xdy815761s0n5omoxoem0");
});

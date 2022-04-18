import React from "react";
import renderer from "react-test-renderer";
import {
  SEARCH_BY_TAG,
  SEARCH_BY_TWEET,
  SEARCH_BY_USER,
} from "../../../queries/search";

import SearchInput from "../../../components/Search/SearchInput";

import { User as UserProps } from "../../../generated/graphql";
import SearchResult from "../../../components/Search/SearchResult";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
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
      query: SEARCH_BY_TAG,
      variables: {
        term: {
          value: "",
        },
      },
    },
    result: {
      data: {},
      errors: "An error occurred",
    },
  },
];

describe("Search Input:", () => {
  test("display <SearchInput/> component when users undefined", () => {
    const tree = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <SearchInput />
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    // fireEvent.click(tree.getByText("Users"));
    expect(tree).toMatchSnapshot();
  });
});

test("Assertion testing of <SearchInput/> component", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <SearchInput />
      </SnackbarProvider>
    </MockedProvider>,
    { wrapper: MemoryRouter }
  );

  expect(screen.getByRole("textbox", { name: "" })).toHaveAttribute(
    "placeholder",
    "Search by tags, tweets, people"
  );
});

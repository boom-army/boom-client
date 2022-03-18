import React from "react";
import { Following } from "../../views/Following";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FeedDocument } from "../../generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { SnackbarProvider } from "notistack";

export const __mocks__: any = [
    {
      request: {
        query: FeedDocument,
        variables: {},
        
      },
      result: {
        data: {
          mentions: [],
        },
        errors: "An error occurred",
      },
    },
  ];

describe("<Following/> component :", () => {
    test("display <Following/> component ", async () => {
      let rendered = render(
          <MockedProvider mocks={__mocks__} addTypename={false}>
              <SnackbarProvider>
        <Following
        />
        </SnackbarProvider>
         </MockedProvider>,
        { wrapper: MemoryRouter }
      );
      expect(rendered).toMatchSnapshot();
    });
  });

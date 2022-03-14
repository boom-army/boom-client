import { ProfileDocument } from "../../../generated/graphql";
import React from "react";
import { NFTGallery } from "../../../components/Profile/NFTGallery";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {
  useEditProfileMutation,
  EditProfileDocument,
} from "../../../generated/graphql";


export const __mocks__: any = [
  {
    request: {
    //   query: EditProfileDocument,
      variables: {
       
      },
    },
    result: {
      data: {
        // editProfile: {
        //   id: "ckzny1iv10031lmn568gj3b3n",
        //   handle: "shy-cloud-4965",
        //   publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
        //   __typename: "User",
        // },
      },
      // errors: "An error occurred",
    },
  },
];



test("NFT Gallery ", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
    //   <MockedProvider mocks={__mocks__} addTypename={false}>
    <SnackbarProvider>
       <NFTGallery publicAddress="JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4" />
       </SnackbarProvider>
    //   </MockedProvider>,{wrapper: MemoryRouter}
    );
  });
  expect(rendered).toMatchSnapshot();
});



import React from "react";
import { ConnectView } from "../../views/Connect";
import { act, fireEvent, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { USERS } from "../../queries/follow/index";


  let user:any =   {
    id: "ckzny1iv10031lmn568gj3b3n",
    publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
    avatar: "",
    handle: "shy-cloud-4965",
    consumerName: "shy-cloud-4965",
    __typename: "User",
  }

  export const __mocks__: any = [
    {
      request: {
        query:USERS,
        variables: {
            offset: 0,
        },
      },
      result: {
        data: {
            users:[{
                id: "ckzny1iv10031lmn568gj3b3n",
                handle: "shy-cloud-4965",
                avatar: "",
                isFollowing: false,
                isSelf: true,
                coverPhoto: "https://my.sosol.app/default-cover.png",
                consumerName: "shy-cloud-4965",
                bio: "full stack developer",
                __typename: "User",
              },{
             
              avatar: "",
              bio: "",
              consumerName: "shiny-silence-3873",
              coverPhoto: "https://my.sosol.app/default-cover.png",
              handle: "shiny-silence-3873",
              id: "cl0tpyv2k22515001mp1vbzhegs",
              isFollowing: false,
              isSelf: false,
              __typename: "User"}]
        
        },
        
      },
    },
  ];

describe("<Connect/> component :", () => {
  test("display <Connect/> component ", async () => {
   
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
        <ConnectView
      />,
        </SnackbarProvider>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
  });
  expect(rendered).toMatchSnapshot();
 
});
});
import React from "react";
import { Follow } from "../../../components/Profile/Follow";
import { BrowserRouter } from "react-router-dom";

// import React, { useEffect, useState } from "react";
// import ProfileInfo from "./ProfileInfo";
// import { Box, Tab } from "@mui/material";
// import { Loader } from "../Loader";
// import { Meeps } from "./Meeps";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useProfileLazyQuery } from "../../../generated/graphql";

import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
// import { NFTGallery } from "./NFTGallery";
// import { CustomResponse } from "../CustomResponse";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { FOLLOW } from "../../../queries/follow/index";
import { act, fireEvent, render } from "@testing-library/react";
// import {render, screen} from '@testing-library/react'

export const __mocks__: any = [
  {
    request: {
      query: FOLLOW,
      variables: {
        id: "ckzny1iv10031lmn568gj3b3n",
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

// describe("user profile : ", () => {
//     it("doesn't exist", () => {
//         const tree = render
//             (
//                 <Follow isFollowing={false} id={'ckzny1iv10031lmn568gj3b3n'} />
//             )

//         expect(tree).toMatchSnapshot();
//     });
// });

test("it should ...", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <Follow isFollowing={false} id={"ckzny1iv10031lmn568gj3b3n"} />
      </MockedProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});

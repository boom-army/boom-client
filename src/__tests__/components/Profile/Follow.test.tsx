import React from "react";
import {Follow} from "../../../components/Profile/Follow";
import {
    BrowserRouter
  } from "react-router-dom";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
// import React, { useEffect, useState } from "react";
// import ProfileInfo from "./ProfileInfo";
// import { Box, Tab } from "@mui/material";
// import { Loader } from "../Loader";
// import { Meeps } from "./Meeps";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useProfileLazyQuery } from "../../../generated/graphql";
// import { NFTGallery } from "./NFTGallery";
// import { CustomResponse } from "../CustomResponse";


// export const __mocks__:any= [
//     {
//       request: {
//        query: TWEET,
//         variables: {
//           offset: 0,
//           limit: 10,
//         },
//       },
//       result: {
//         data: {
//           mentions:[]
//         ,
//         },
//         errors: "An error occurred",
//       },
//   }
//   ]

// describe("user profile : ", () => {
//     it("doesn't exist", () => {
//       const tree = renderer
//         .create(
//         // <Follow />
//         )
//         .toJSON();
//       expect(tree).toMatchSnapshot();
//     });
//   });
import React from "react";
import { User } from "../../../components/User/index";
import renderer from "react-test-renderer";

// const data :any= {
//     "id": "ckzny1iv10031lmn568gj3b3n",
//     "avatar": "",
//     "handle": "shy-cloud-4965",
//     "consumerName": "shy-cloud-4965"
//     , "__typename": "User"
// }

const data: any = {
  id: "ckzny1iv10031lmn568gj3b3n",
  handle: "shy-cloud-4965",
  avatar: "",
  isFollowing: false,
  isSelf: true,
  consumerName: "shy-cloud-4965",
  bio: "full stack developer",
  __typename: "User",
};

describe("user info", () => {
  test("renders correctly user", () => {
    const tree = renderer.create(<User user={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

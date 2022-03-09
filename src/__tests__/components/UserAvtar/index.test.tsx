import React from "react";
import PersonAvatar from "../../../components/UserAvatar/index";
import renderer from "react-test-renderer";

const avatar: string = `https://sosol-prod.s3.us-west-2.amazonaws.com/images/Screenshot%20from%202022-02-01%2018-34-57.png`;

describe("Avtar", () => {
  test("renders correctly when User have no avatar", () => {
    const tree = renderer
      .create(<PersonAvatar avatar={undefined && ""} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly when User have avatar", () => {
    const tree = renderer.create(<PersonAvatar avatar={avatar} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

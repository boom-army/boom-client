import React from "react";
import PersonAvatar from "../../../components/UserAvatar/index";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
       // includeStyles: false 
  }
));


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

test("Assertion testing of <PersonAvatar/> component", () => {
  render(<PersonAvatar avatar={avatar} />);
  expect(screen.getByRole("img", { name: "" })).toHaveAttribute(
    "src",
    "https://sosol-prod.s3.us-west-2.amazonaws.com/images/Screenshot%20from%202022-02-01%2018-34-57.png"
  );
});

import React from "react";
// import WhoToFollow from '../../components/WhoToFollow';
import renderer from "react-test-renderer";
import { WhoToFollow } from "../../components/WhoToFollow";

test('renders a snapshot', () => {
    const tree = renderer.create(<WhoToFollow/>).toJSON();
    expect(tree).toMatchSnapshot();
});
// test("Jest works", () => {
//   expect(true).toBeTruthy();
// });

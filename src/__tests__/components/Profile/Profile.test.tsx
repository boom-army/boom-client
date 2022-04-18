import { Profile } from "../../../components/Profile/Profile";
import renderer from "react-test-renderer";
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
    // includeStyles: false 
  }
));


describe("user profile : ", () => {
  test("doesn't exist", () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

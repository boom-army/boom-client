import { Profile } from "../../../components/Profile/Profile";
import renderer from "react-test-renderer";


describe("user profile : ", () => {
  test("doesn't exist", () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


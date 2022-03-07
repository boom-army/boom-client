import React from 'react';
import PersonAvatar from '../../../components/UserAvatar/index';
import renderer from 'react-test-renderer';
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

describe("avtar rener snapshot", ()=>{
  it('renders correctly when Person have no avtar', () => {
    const tree = renderer.create(<PersonIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('renders a snapshot', () => {
  
    const tree = renderer.create(<PersonAvatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})


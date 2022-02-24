import React from "react";
import { LoadingIcon } from "./Icons";
import { styled } from '@mui/material/styles';
  
const Wrapper = styled('div')(props=>({
  position: 'relative',
  'svg' :{
    fill: props.theme.accentColor,
    width: '34px',
    height: '34px',
    position: 'absolute',
    top: '0',
    left: '43%',
    opacity: '0.8',
    transform: 'translateX(-50%) translateY(-50%)',
    "@keyframes rotateABD" : {
      'from': {
        transform: 'rotate(-360deg)',
      },
    
      'to': {
        transform: 'rotate(0deg)',
      }},
     animation: 'rotateABD 2s linear infinite',
}
}));

export const Loader = () => (
  <Wrapper>
    <LoadingIcon />
  </Wrapper>
);

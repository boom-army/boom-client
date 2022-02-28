import { styled } from '@mui/material/styles';
import { WhoToFollow } from "../components/WhoToFollow";

const Wrapper = styled('div')({
  position: 'relative',
  padding: '1rem',
  minHeight: '100vh',
});

export const Suggestion = () => {
  return (
    <Wrapper>
      <WhoToFollow />
    </Wrapper>
  );
};

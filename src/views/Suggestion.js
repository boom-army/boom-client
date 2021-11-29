import styled from "styled-components";
import { WhoToFollow } from "../components/WhoToFollow";

const Wrapper = styled.div`
	position: relative;
  padding: 1rem;
  min-height: 100vh;
`;

export const Suggestion = () => {
  return (
    <Wrapper>
      <WhoToFollow />
    </Wrapper>
  );
};

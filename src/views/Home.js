import React from "react";
import styled from "styled-components";
import { FeedList } from "../components/FeedList";
import { NewTweet } from "../components/Tweet";

const Wrapper = styled.div``;

export const Home = () => {
  return (
    <Wrapper>
      <NewTweet />
      <FeedList />
    </Wrapper>
  );
};

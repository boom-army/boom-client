import React, { useEffect } from "react";
import styled from "styled-components";
import { FeedList } from "../components/FeedList";
import { NewTweet } from "../components/Tweet";
import { useFeedQuery } from "../generated/graphql";

const Wrapper = styled.div``;

export const Home: React.FC = () => {
  const { loading, error, data, fetchMore } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      fetchMore({
        variables: {
          offset: data?.feed?.length,
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Wrapper>
      <NewTweet feed={data?.feed} />
      <FeedList loading={loading} error={error} data={data} />
    </Wrapper>
  );
};

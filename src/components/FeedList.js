import React, { useEffect, useState } from "react";
import CustomResponse from "./CustomResponse";
import styled from "styled-components";
import { FEED } from "../queries/others";
import { Loader } from "./Loader";
import { Tweet } from "./Tweet";
import { useQuery } from "@apollo/client";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

export const FeedList = () => {
  const { loading, error, data, fetchMore } = useQuery(FEED, {
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
      console.log("at the bottom");
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
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <CustomResponse text={error.message} />;

  // logout the user if removed from db
  if (data === undefined) {
    localStorage.clear();
  }

  return (
    <Wrapper>
      {data?.feed?.length ? (
        data.feed.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};

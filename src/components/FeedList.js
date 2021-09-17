import React from "react";
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
  const { loading, error, data } = useQuery(FEED);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  // logout the user if removed from db
  if(data === undefined) {
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

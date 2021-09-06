import React from "react";
import CustomResponse from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { Tweet } from "../components/Tweet";
import styled from "styled-components";
import { MENTIONS } from "../queries/others";
import { useQuery } from "@apollo/client";

const Wrapper = styled.div``;

export const Notifications = () => {
  const { loading, error, data } = useQuery(MENTIONS);

  if (loading) return <Loader />;

  return (
    <Wrapper>
      {data?.mentions?.length ? (
        data.mentions.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};

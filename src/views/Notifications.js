import { useEffect } from "react";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { ShowTweet } from "../components/Tweet";
import styled from "styled-components";
import { MENTIONS } from "../queries/others";
import { useQuery } from "@apollo/client";

const Wrapper = styled.div``;

export const Notifications = ({ refetchProfile }) => {
  const { loading, data } = useQuery(MENTIONS);

  useEffect(() => {
    refetchProfile && refetchProfile();
  }, [data, refetchProfile]);

  if (loading) return <Loader />;

  return (
    <Wrapper>
      {data?.mentions?.length ? (
        data.mentions.map((tweet) => <ShowTweet key={tweet.id} tweet={tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};

import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { ShowTweet } from "../components/Tweet";
import { MENTIONS } from "../queries/others";
import { useQuery } from "@apollo/client";
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useMentionsQuery } from "../generated/graphql";

const Wrapper = styled('div')({});

export const Notifications = ({ refetchProfile }) => {
  const { loading, data } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "network-only",
  });

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

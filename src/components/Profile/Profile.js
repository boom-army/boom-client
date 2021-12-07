import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileInfo from "./ProfileInfo";
import { ShowTweet } from "../Tweet";
import { Loader } from "../Loader";
import { PROFILE } from "../../queries/profile";

const Wrapper = styled.div`
	padding-bottom: 5rem;

  .profile-top {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    span.tweetsCount {
      margin-top: 0.1rem;
      color: ${(props) => props.theme.secondaryColor};
      font-size: 0.9rem;
    }
  }
`;

export const Profile = () => {
  const { handle } = useParams();

  const { loading, error, data } = useQuery(PROFILE, {
    variables: { handle },
  });

  if (loading) return <Loader />;

  return (
    <Wrapper>
      {/* <div className="profile-top">
        <span>{data && data.profile && data.profile.consumerName}</span>
        <span className="tweetsCount">
          {data && data.profile && data.profile.tweetsCount
            ? `${data.profile.tweetsCount} Tweets`
            : "No Tweets"}
        </span>
      </div> */}
      <ProfileInfo profile={data && data.profile} />
      {data && data.profile && data.profile.tweets && data.profile.tweets.length
        ? data.profile.tweets.map((tweet) => (
          <ShowTweet key={tweet.id} tweet={tweet} />
        ))
        : null}
    </Wrapper>
  );
};

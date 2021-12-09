import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileInfo from "./ProfileInfo";
import { ShowTweet } from "../Tweet";
import { Loader } from "../Loader";
import { useProfileQuery, Tweet } from "../../generated/graphql";

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

export const Profile: React.FC = () => {
  let { handle } = useParams<string>();
  handle = handle ? handle : "";

  const { loading, data } = useProfileQuery({
    variables: { handle },
  });

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <ProfileInfo profile={data && data.profile} />
      {data && data.profile && data.profile.tweets && data.profile.tweets.length
        ? data.profile.tweets.map(tweet => (
          <ShowTweet key={tweet.id} tweet={tweet as Tweet} offset={10} parentTweetId="" />
        ))
        : null}
    </Wrapper>
  );
};

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { TWEET } from "../../queries/tweet";
import { Loader } from "../Loader";
import { Tweet } from "./Tweet";
import { NewTweet } from ".";
import CustomResponse from "../CustomResponse";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

export const MasterTweet = () => {
  const { tweetId } = useParams();

  const { loading, data } = useQuery(TWEET, {
    variables: { id: tweetId },
  });

  const comments = data?.tweet?.childTweets?.length > 0 ? data.tweet.childTweets : [];
  const exists = !!data?.tweet?.id;

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {exists ? (
            <Tweet tweet={data && data.tweet} />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to exist." />
          )}
          {exists ? <NewTweet parentTweet={data.tweet.id} /> : null}
          {comments && comments.map((comment) => (
            <Tweet tweet={comment && comment} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { TWEET } from "../../queries/tweet";
import { Loader } from "../Loader";
import { Tweet } from "./Tweet";
import Comment from "../Comment/Comment";
import AddComment from "../Comment/AddComment";
import CustomResponse from "../CustomResponse";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

export const MasterTweet = () => {
  const { tweetId } = useParams();

  const { loading, data } = useQuery(TWEET, {
    variables: { id: tweetId },
  });

  const comments = data?.tweet?.comments?.length > 0 ? data.tweet.comments : [];
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
          {exists ? <AddComment id={data.tweet.id} /> : null}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { TWEET } from "../../queries/tweet";
import { Loader } from "../Loader";
import { NewTweet, ParentTweet, ShowTweet } from ".";
import { CustomResponse } from "../CustomResponse";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

export const MasterTweet = () => {
  const { tweetId } = useParams();

  const { loading, data } = useQuery(TWEET, {
    variables: { id: tweetId },
  });

  const comments =
    data?.tweet?.childTweets?.length > 0 ? data.tweet.childTweets : [];
  const exists = !!data?.tweet?.id;
  const hasParent = !!data?.tweet?.parentTweet?.id;

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {hasParent && (
            <ParentTweet parentTweet={data?.tweet?.parentTweet?.id} />
          )}
          {exists ? (
            <ShowTweet
              tweet={data && data.tweet}
              parentTweetId={data?.tweet?.id}
            />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to exist." />
          )}
          {exists && <NewTweet parentTweet={data.tweet.id} />}
          {comments &&
            comments.map((comment) => (
              <ShowTweet
                tweet={comment && comment}
                parentTweetId={data?.tweet?.id}
                key={comment.id}
              />
            ))}
        </>
      )}
    </Wrapper>
  );
};

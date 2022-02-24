import React from "react";
import boomLogo from "../../images/logo.png"
import styled from "styled-components";
import useMetaTags from "react-metatags-hook";
import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { META_METAS, META_LINKS, META_OG } from "../../constants/meta";
import { NewTweet, ParentTweet, ShowTweet } from ".";
import { TWEET } from "../../queries/tweet";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

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

  let heroImage = boomLogo;
  if (data?.tweet?.files?.length) heroImage = data.tweet.files[0].url;
  if (data?.tweet?.nft?.image) heroImage = data.tweet.nft.image;

  useMetaTags(
    {
      metas: [...META_METAS],
      links: [ ...META_LINKS ],
      openGraph: META_OG,
      twitter: {
        title: `Meep on app.boom.army by ${data?.tweet?.user?.handle}`,
        description: data?.tweet?.text,
        image: heroImage,
      },
    },
    [data]
  );
  

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
            />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to exist." />
          )}
          {exists && <NewTweet parentTweet={data?.tweet?.id} />}
          {comments &&
            comments.map((comment) => (
              <ShowTweet
                tweet={comment && comment}
                key={comment.id}
              />
            ))}
        </>
      )}
    </Wrapper>
  );
};

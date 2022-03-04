import React from "react";
import boomLogo from "../../images/logo.png";
import { styled } from "@mui/material/styles";
import { CustomResponse } from "../CustomResponse";
import { Helmet } from "react-helmet";
import { Loader } from "../Loader";
import { NewTweet, ParentTweet, ShowTweet } from ".";
import { TWEET } from "../../queries/tweet";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";


const Wrapper = styled("div")({
  marginBottom: "7rem",
});

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

  return (
    <Wrapper>
      <Helmet>
        <title>Boom</title>
        <meta
          name="title"
          content={`Meep on app.boom.army by ${data?.tweet?.user?.handle}`}
        />
        <meta name="description" content={data?.tweet?.text} />

        <meta name="og:url" content={window.location.href} />
        <meta
          name="og:title"
          content={`Meep on app.boom.army by ${data?.tweet?.user?.handle}`}
        />
        <meta name="og:description" content={data?.tweet?.text} />
        <meta name="og:image" content={heroImage} />

        <meta name="twitter:url" content={window.location.href} />
        <meta
          name="twitter:title"
          content={`Meep on app.boom.army by ${data?.tweet?.user?.handle}`}
        />
        <meta name="twitter:description" content={data?.tweet?.text} />
        <meta name="twitter:image" content={heroImage} />
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          {hasParent && (
            <ParentTweet parentTweet={data?.tweet?.parentTweet?.id} />
          )}
          {exists ? (
            <ShowTweet tweet={data && data.tweet} />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to exist." />
          )}
          {exists && <NewTweet parentTweet={data?.tweet?.id} />}
          {comments &&
            comments.map((comment:any) => (
              <ShowTweet tweet={comment && comment} key={comment.id} />
            ))}
        </>
      )}
    </Wrapper>
  );
};
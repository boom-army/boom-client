// import boomLogo from "../../images/boom-logo.png";
// import { styled } from "@mui/material/styles";
import { CustomResponse } from "../CustomResponse";
// import { Helmet } from "react-helmet";
import { Loader } from "../Loader";
import { NewTweet, ParentTweet, ShowTweet } from ".";
import { Tweet, TweetQuery, useTweetQuery } from "../../generated/graphql";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import _ from "lodash";

export const MasterTweet = () => {
  const { tweetId } = useParams();

  const { data, loading } = useTweetQuery({
    variables: {
      id: tweetId!,
    },
  });
  const { user: userData } = useContext(UserContext);

  const comments =
    data?.tweet?.masterTweets?.length! > 0 ? data?.tweet.masterTweets : [];
  const exists = !!data?.tweet?.id;
  const hasParent = !!data?.tweet?.parentTweet?.id;
  const nestTweets = (
    tweets: Tweet[],
    parentId: string | null = null
  ): Tweet[] => {
    return _(tweets)
      .filter((tweet) => {
        if (tweet?.parentTweet === null) return parentId === null;
        return tweet?.parentTweet?.id === parentId;
      })
      .sortBy("__typename")
      .map((tweet) => ({
        ...tweet,
        childTweets: nestTweets(tweets, tweet.id),
      }))
      .value();
  };
  const nestedTweets = nestTweets(comments as Tweet[]);
  console.log("*****", nestedTweets);

  return (
    <Box mb={7}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {hasParent && (
            <ParentTweet parentTweet={data?.tweet?.parentTweet?.id} />
          )}
          {exists ? (
            <ShowTweet tweet={data.tweet} />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to exist." />
          )}
          {exists && userData && (
            <NewTweet
              parentTweet={data?.tweet?.id}
              masterTweet={data?.tweet?.masterTweet?.id}
            />
          )}
          {comments &&
            comments.map((comment: any) => (
              <ShowTweet tweet={comment} key={comment.id} />
            ))}
        </>
      )}
    </Box>
  );
};

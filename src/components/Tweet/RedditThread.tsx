// import boomLogo from "../../images/boom-logo.png";
// import { styled } from "@mui/material/styles";
import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { NewTweet, ParentTweet, ShowTweet } from ".";
import { Maybe, Tweet, useTweetQuery } from "../../generated/graphql";
import { useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useContext, FC } from "react";
import { UserContext } from "../../contexts/user";
import _ from "lodash";

interface NestedMeepProps {
  meep: Maybe<Tweet>;
}

export const RedditThread = () => {
  const { tweetId } = useParams();
  const theme = useTheme();

  const { data, loading } = useTweetQuery({
    variables: {
      id: tweetId!,
    },
  });

  const { user: userData } = useContext(UserContext);

  const comments =
    data?.tweet?.masterTweets?.length! > 0
      ? data?.tweet.masterTweets
      : ([] as Tweet[]);
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
  const getNestedTweets = nestTweets(comments as Tweet[]);
  const nestedTweets = getNestedTweets.length
    ? getNestedTweets
    : data?.tweet.childTweets;

  const NestedMeep: FC<NestedMeepProps> = ({ meep }) => {
    return (
      <Box
        sx={{
          pl: 1,
          position: "relative",
        }}
      >
        <ShowTweet tweet={meep as Tweet} key={meep?.id} />
        {meep?.childTweets?.map((childMeep) => (
          <NestedMeep meep={childMeep} key={childMeep?.id} />
        ))}
        <Box
          sx={{
            content: '""',
            position: "absolute",
            top: 16,
            bottom: 0,
            left: 6,
            width: "1px",
            height: "calc(100% + 1rem)",
            backgroundColor: theme.tertiaryColor,
          }}
        />
      </Box>
    );
  };

  return (
    <Box mb={7}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {hasParent && (
            <ParentTweet
              parentTweet={data?.tweet?.parentTweet?.id}
              masterTweet={data?.tweet?.masterTweet?.id}
            />
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
          {nestedTweets &&
            nestedTweets.map((comment) => (
              <NestedMeep meep={comment as Tweet} key={comment?.id} />
            ))}
        </>
      )}
    </Box>
  );
};

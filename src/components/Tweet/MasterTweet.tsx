import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { NewTweet, ParentTweet, ShowTweet } from ".";
import { Tweet, TweetQuery, useTweetQuery } from "../../generated/graphql";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/user";
import _ from "lodash";
import { TweetThread } from "./TweetThread/TweatThread";

export const MasterTweet: React.FC = () => {
  const { tweetId } = useParams();
  const { data, loading } = useTweetQuery({
    variables: {
      id: tweetId!,
    },
  });

  const { user: userData } = useContext(UserContext);

  const exists = !!data?.tweet?.id;
  const hasParent = !!data?.tweet?.parentTweet?.id;

  return (
    <Box mb={7}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
            {data?.tweet?.masterTweets?.length! > 0 ? (
              <TweetThread
                key={tweetId}
                tweet={data?.tweet as TweetQuery["tweet"]}
                isMaster={true}
              />
            ) : (
              <Grid item xs={12}>
                <CustomResponse text="No hero's have meeped." />
              </Grid>
            )}
          </>
        </>
      )}
    </Box>
  );
};

import React from "react";
import { DELETE_TWEET } from "../../queries/tweet";
import { TrashIcon } from "../Icons";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { FeedDocument, Tweet } from "../../generated/graphql";

export const DeleteTweet = ({ id }: any) => {
  const [deleteTweetMutation, { loading }] = useMutation(DELETE_TWEET, {
    variables: { id },
    update: (cache, { data: { deleteTweet } }) => {
      const { feed }: any = cache.readQuery({ query: FeedDocument });
      cache.writeQuery({
        query: FeedDocument,
        data: {
          feed: feed.filter((tweet: Tweet) => tweet.id !== deleteTweet.id),
        },
      });
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTweet = async () => {
    await deleteTweetMutation();
    enqueueSnackbar("Your tweet has been deleted", { variant: "success" });
  };

  return <TrashIcon loading={loading} onClick={handleDeleteTweet} />;
};

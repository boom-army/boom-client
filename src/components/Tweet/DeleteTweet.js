import React from "react";
import { DELETE_TWEET } from "../../queries/tweet";
import { FEED } from "../../queries/others";
import { TrashIcon } from "../Icons";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

export const DeleteTweet = ({ id }) => {
  const [deleteTweetMutation, { loading }] = useMutation(DELETE_TWEET, {
    variables: { id },
    update: (cache, { data: { deleteTweet } }) => {
      const { feed } = cache.readQuery({ query: FEED });
      cache.writeQuery({
        query: FEED,
        data: {
          feed: feed.filter((tweet) => tweet.id !== deleteTweet.id),
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

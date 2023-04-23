import React from "react";
import { FeedDocument, Tweet } from "../../generated/graphql";
import { TrashIcon } from "../Icons";
import { useDeleteTweetMutation } from "../../generated/graphql";
import { useSnackbar } from "../../contexts/snackbar";

interface Props {
  id: string;
}

export const DeleteTweet: React.FC<Props> = ({ id }) => {
  const [deleteTweetMutation, { loading }] = useDeleteTweetMutation({
    variables: { id },
    update: (cache, { data }) => {
      const { feed }: any = cache.readQuery({ query: FeedDocument });
      cache.writeQuery({
        query: FeedDocument,
        data: {
          feed: feed.filter(
            (tweet: Tweet) => tweet.id !== data?.deleteTweet?.id
          ),
        },
      });
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTweet = async () => {
    await deleteTweetMutation();
    enqueueSnackbar("Your meep has been deleted", { variant: "success" });
  };

  return <TrashIcon loading={loading} onClick={handleDeleteTweet} />;
};

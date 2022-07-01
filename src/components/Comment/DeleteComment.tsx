import React from "react";
import { DELETE_COMMENT } from "../../queries/comment";
import { Comment, TweetDocument } from "../../generated/graphql";
import { TrashIcon } from "../Icons";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbar";

interface DeleteProps {
  id: string;
}

const DeleteComment = ({ id }: DeleteProps) => {
  const { tweetId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [deleteCommentMutation, { loading }] = useMutation(DELETE_COMMENT, {
    variables: { id },
    update: (cache, { data: { deleteComment } }) => {
      const { tweet }: any = cache.readQuery({
        query: TweetDocument,
        variables: { id: tweetId },
      });

      cache.writeQuery({
        query: TweetDocument,
        data: {
          tweet: {
            ...tweet,
            commentsCount: tweet.commentsCount - 1,
            comments: tweet.comments.filter(
              (comment: Comment) => comment.id !== deleteComment.id
            ),
          },
        },
      });
    },
  });

  const handleDeleteComment = async () => {
    await deleteCommentMutation();
    enqueueSnackbar("Your comment has been deleted", { variant: "success" });
  };

  return <TrashIcon loading={loading} onClick={handleDeleteComment} />;
};

export default DeleteComment;

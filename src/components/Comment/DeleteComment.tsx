import React from "react";
import { DELETE_COMMENT } from "../../queries/comment";
import { TWEET } from "../../queries/tweet";
import { TrashIcon } from "../Icons";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbar";
import { Comment, Tweet } from "../../generated/graphql";

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
        query: TWEET,
        variables: { id: tweetId },
      });

      cache.writeQuery({
        query: TWEET,
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

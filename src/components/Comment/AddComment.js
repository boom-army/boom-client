import React from "react";
import Button from "../../styles/Button";
import UserAvatar from "../UserAvatar";
import useInput from "../../hooks/useInput";
import { ADD_COMMENT } from "../../queries/comment";
import { Box } from "@mui/system";
import { TWEET } from "../../queries/tweet";
import { USER } from "../../queries/client";
import { displayError } from "../../utils";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { NewTweet } from "../Tweet";


const AddComment = ({ id }) => {
  const comment = useInput("");
  const { enqueueSnackbar } = useSnackbar();

  const [addCommentMutation, { loading }] = useMutation(ADD_COMMENT, {
    update: (cache, payload) => {
      const { tweet } = cache.readQuery({
        query: TWEET,
        variables: {
          id,
        },
      });

      let comments = tweet.comments;
      comments = [...comments, payload.data.addComment];

      cache.writeQuery({
        query: TWEET,
        data: {
          tweet: { ...tweet, commentsCount: tweet.commentsCount + 1, comments },
        },
      });
    },
  });

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!comment.value) return enqueueSnackbar("Write a reply");

    try {
      await addCommentMutation({
        variables: {
          id,
          text: comment.value,
        },
      });

      comment.setValue("");
      return enqueueSnackbar("Your reply has been added", { variant: "success" });
    } catch (err) {
      return displayError(err, enqueueSnackbar);
    }
  };

  const { data } = useQuery(USER);

  return (
    <>
      <NewTweet feed={data?.feed} parentTweet={id} />
    </>
  );
};

export default AddComment;

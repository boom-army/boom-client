import React from "react";
import Button from "../../styles/Button";
import TextareaAutosize from "react-textarea-autosize";
import UserAvatar from "../UserAvatar";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { ADD_COMMENT } from "../../queries/comment";
import { Box } from "@mui/system";
import { TWEET } from "../../queries/tweet";
import { USER } from "../../queries/client";
import { displayError } from "../../utils";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

const Wrapper = styled.div`
	display: flex;
	padding: 1rem 1rem;
	border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};

	textarea {
		width: 100%;
		background: inherit;
		border: none;
		font-size: 1.23rem;
		font-family: ${(props) => props.theme.font};
		color: ${(props) => props.theme.primaryColor};
		margin-bottom: 1.4rem;
	}

	.add-comment {
		display: flex;
		flex-direction: column;
	}

	.add-comment-action
		display: flex;
		align-items: center;
	}

	@media screen and (max-width: 530px) {
		textarea {
		  font-size: 0.9rem;
		}
	}
`;

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
    <Wrapper>
      <Box mr={2}>
        <UserAvatar avatar={data?.me?.avatar} />
      </Box>

      <form onSubmit={handleAddComment}>
        <div className="add-comment">
          <TextareaAutosize
            cols="48"
            placeholder="Tweet your reply"
            type="text"
            value={comment.value}
            onChange={comment.onChange}
          />

          <div className="add-comment-action">
            <Button sm disabled={loading}>
              Reply
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddComment;

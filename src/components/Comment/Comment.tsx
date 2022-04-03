import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import UserAvatar from "../UserAvatar";
import DeleteComment from "./DeleteComment";
import { setDate } from "../../utils";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
// import { Comment } from "../../generated/graphql";

const Wrapper = styled("div")((props) => ({
  display: "flex",
  borderBottom: `1px solid ${props.theme.tertiaryColor}`,
  padding: "1.5rem 1rem 1rem 1rem",

  ".comment-info-user": {
    display: "flex",

    svg: {
      marginLeft: "0.6rem",
      position: "relative",
      top: "3px",
    },
  },

  ".comment-info-user span.username": {
    fontWeight: "500",
  },

  ".comment-info-user span.secondary": {
    paddingLeft: "0.5rem",
    color: `${props.theme.secondaryColor}`,
  },

  "@media screen and (max-width: 430px)": {
    flexDirection: "column",

    ".comment-info-user": {
      fontSize: "0.83rem",
    },

    ".avatar": {
      display: "none",
    },

    ".username": {
      display: "none",
    },

    ".comment-info-user span.secondary": {
      paddingLeft: "0",
      ":first-of-type": {
        paddingRight: "0.6rem",
      },
    },
  },
}));

interface CommentProps {
  id: string;
  text?: string;
  isCommentMine?: boolean;
  user?: any;
  createdAt?: string;
}

const Comment = ({
  id,
  text,
  isCommentMine,
  user,
  createdAt,
}: CommentProps) => {
  // const { id, text, isCommentMine, user, createdAt } = comment;
  const handle = user && user.handle;

  return (
    <Wrapper>
      <Box mr={2}>
        <UserAvatar avatar={user?.avatar} />
      </Box>
      <div className="comment-info">
        <div className="comment-info-user">
          <span className="username">{user && user.consumerName}</span>
          <Link to={`/${handle}`}>
            <span className="secondary">{`@${handle}`}</span>
            <span className="secondary">
              {moment(setDate(createdAt)).fromNow()}
            </span>
          </Link>
          <span>{isCommentMine ? <DeleteComment id={id} /> : null}</span>
        </div>

        <p>{text}</p>
      </div>
    </Wrapper>
  );
};

export default Comment;

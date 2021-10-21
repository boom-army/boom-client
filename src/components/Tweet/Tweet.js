import React from "react";
import Avatar from "@mui/material/Avatar";
import PersonIcon from '@mui/icons-material/Person';
import Linkify from "linkifyjs/react";
import { EmojiTweet, DeleteTweet, Retweet } from "./index";
import TweetFile from "../../styles/TweetFile";
// eslint-disable-next-line
import hashtag from "linkifyjs/plugins/hashtag";
// eslint-disable-next-line
import mention from "linkifyjs/plugins/mention";
import moment from "moment";
import styled from "styled-components";
import { CommentIcon } from "../Icons";
import { Link } from "react-router-dom";
import { setDate } from "../../utils";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding: 1.5rem 1rem 1rem 1rem;

  .avatar {
    margin-right: 1em;
    margin-bottom: 1em;
  }

  .tweet-info-user {
    display: flex;
  }

  .tweet-info-user span.username {
    font-weight: 500;
  }

  .tweet-info-user span.secondary {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.secondaryColor};
  }

  .tags {
    display: flex;
  }

  a.body {
    color: ${(props) => props.theme.accentColor};
  }

  div.tweet-stats {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;

    div {
      margin-right: 4rem;
      min-width: 40px;
      color: ${(props) => props.theme.secondaryColor};
    }

    svg {
      margin-right: 0.5rem;
    }

    span {
      display: flex;
      align-items: center;
    }

    span.comment {
      svg {
        position: relative;
        top: 4px;
      }
    }
  }

  @media screen and (max-width: 470px) {
    div.tweet-stats {
      div {
        margin-right: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;

    .username {
      display: none;
    }

    .avatar {
      display: none;
    }

    .tweet-info-user span.secondary {
      padding-left: 0;
      padding-right: 0.5rem;
    }
  }
`;

export const Tweet = ({ tweet }) => {
  const {
    id,
    text,
    // tags,
    user,
    files,
    isTweetMine,
    isRetweet,
    retweetsCount,
    reactions,
    commentsCount,
    createdAt,
  } = tweet;

  const handle = user && user.handle;
  const linkifyOptions = {
    formatHref: function (value, type) {
      if (type === "hashtag") {
        return "explore?=" + value.substring(1);
      }
      return value;
    },
    className: "body",
  };

  return (
    <Wrapper>
      <Link to={`/${handle}`}>
        <Avatar className="avatar" src={user && user.avatar ? user.avatar : <PersonIcon />} />
      </Link>

      <div className="tweet-info">
        <div className="tweet-info-user">
          <Link to={`/${handle}`}>
            <span className="username">{user && user.consumerName}</span>
            <span className="secondary">{`@${handle}`}</span>
          </Link>
          &nbsp;&nbsp;
          <Link to={`/${handle}/status/${id}`} className="secondary">
            {moment(setDate(createdAt)).fromNow()}
          </Link>
        </div>

        <Linkify options={linkifyOptions}>
          <p>{text}</p>
        </Linkify>

        <Link to={`/${handle}/status/${id}`}>
          {files && files.length && files[0] ? (
            <TweetFile src={files[0].url} alt="tweet-file" />
          ) : null}
        </Link>

        <div className="tweet-stats">
          <span>
            <EmojiTweet tweetId={id} userPubKey={user?.publicAddress} reactions={reactions} />
          </span>

          <div>
            <span className="comment">
              <Link to={`/${handle}/status/${id}`}>
                <CommentIcon />
                {commentsCount ? commentsCount : null}
              </Link>
            </span>
          </div>

          <div>
            <Retweet
              id={id}
              isRetweet={isRetweet}
              retweetsCount={retweetsCount}
            />
          </div>

          {/* <div>
            <span>{isTweetMine ? <DeleteTweet id={id} /> : null}</span>
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

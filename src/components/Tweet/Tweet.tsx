import React from "react";
import 'linkify-plugin-hashtag';
import 'linkify-plugin-mention';
import Linkify from 'linkify-react';
import UserAvatar from "../UserAvatar";
import moment from "moment";
import styled from "styled-components";
import { CommentIcon } from "../Icons";
import { EmojiTweet, Retweet } from "./index";
import { ImageBox } from "../ImageBox";
import { Link } from "react-router-dom";
import { setDate } from "../../utils";
import { VideoContainer } from "../Giphy/VideoContainer"
import { NFTTweet } from "../NFT/NFTTweet";
import { Tweet } from "../../generated/graphql";
import { TipCreator } from "../TipCreator";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding: 1.5rem 1rem 1rem 1rem;

  .avatar {
    margin-right: 1em;
    margin-bottom: 1em;
  }

  .tweet-info {
    width: 100%;
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

  .tweet-body {
    margin-bottom: 0.75rem;
    word-break: break-word;
  }

  .tags {
    display: flex;
  }

  a.body {
    color: ${(props) => props.theme.accentColor};
  }

  div.tweet-stats {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    div {
      margin-right: 4rem;
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

interface Props {
  tweet: Tweet;
  offset: Number;
  parentTweetId: String | undefined;
}

export const ShowTweet: React.FC<Props> = ({ tweet, offset, parentTweetId }) => {
  const {
    id,
    text,
    // tags,
    user,
    files,
    gif,
    nft,
    // isTweetMine,
    isRetweet,
    retweetsCount,
    reactions,
    commentsCount,
    createdAt,
  } = tweet;

  const handle = user && user.handle;
  const linkifyOptions = {
    className: 'body',
    target: { url: '_blank' },
    formatHref: { hashtag: (href: any) => `explore?=${href.substring(1)}` },
  };

  return (
    <Wrapper>
      <Link to={`/${handle}`}>
        <UserAvatar className="avatar" avatar={user?.avatar as string} />
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
          <p className="tweet-body">{text}</p>
        </Linkify>

        {gif && <VideoContainer gif={gif} />}

        {nft && <NFTTweet nftData={nft}/>}

        {!!files.length && <ImageBox files={files} disableLightbox={false} />}

        <div className="tweet-stats">
          <EmojiTweet
            parentTweetId={parentTweetId}
            tweetId={id}
            userPubKey={user?.publicAddress}
            reactions={reactions}
            offset={offset}
          />

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

          <>
            <TipCreator />
          </>

          {/* <div>
            <span>{isTweetMine ? <DeleteTweet id={id} /> : null}</span>
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

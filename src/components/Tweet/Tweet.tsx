import React from "react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import Linkify from "linkify-react";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import { CommentIcon } from "../Icons";
import { EmojiTweet, Retweet } from "./index";
import { ImageBox } from "../ImageBox";
import { Link } from "react-router-dom";
import { setDate } from "../../utils";
import { VideoContainer } from "../Giphy/VideoContainer";
import { NFTTweet } from "../NFT/NFTTweet";
import { Tweet } from "../../generated/graphql";
import { TipCreator } from "../TipCreator";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { styled } from '@mui/material/styles';


const Wrapper = styled('div')(props=>({
  display:'flex',
   borderBottom: `1px solid ${props.theme.tertiaryColor}`,
  padding: '1.5rem 1rem 1rem 1rem',

  '.avatar': {
    marginRight: '1em',
    marginBottom: '1em',
  },

  '.tweet-info':{
    width: '100%',
  },

  '.tweet-info-user': {
    display: 'flex',
  },

  '.tweet-info-user span.username' :{
    fontWeight: 500,
  },

  '.tweet-info-user span.secondary':{
    paddingLeft: '0.5rem',
   color: props.theme.secondaryColor ,
  },

  '.tweet-body':{
    marginBottom: '0.75rem',
    wordBreak: 'break-word',
  },

  '.tags': {
    display: 'flex',
  },

  'a.body': {
    color: props.theme.accentColor,
  },

  'div.tweet-stats': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',

    'div': {
      color:props.theme.secondaryColor,
    },

    '.controls': {
      marginRight: '4rem',
    },

    'svg':{
      marginRight: '0.5rem',
    },

    'span' :{
      display: 'flex',
      alignItems: 'center',
    },

    'span.comment' :{
      'svg': {
        position: 'relative',
        top: '4px',
      }
    }
  },

  '@media screen and (max-width: 470px)' :{
    'div.tweet-stats': {
      'div':{
        marginRight: '1.5rem',
      }
    }
  },

  '@media screen and (max-width: 430px)':{
    flexDirection: 'column',

    '.username': {
      display: 'none',
    },

    '.avatar': {
      display: 'none',
    },

    '.tweet-info-user span.secondary': {
      paddingLeft: '0',
      paddingRight: '0.5rem',
    }
  }
}));



interface Props {
  tweet: Tweet;
  offset: Number;
  parentTweetId: String | undefined;
}


export const ShowTweet: React.FC<Props> = ({
  tweet,
  offset,
  parentTweetId,
}) => {
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
    tipsCount,
    createdAt,
  } = tweet;

  const handle = user && user.handle;
  const linkifyOptions = {
    className: "body",
    target: { url: "_blank" },
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

        {nft && <NFTTweet nftData={nft} />}

        {!!files.length && <ImageBox files={files} disableLightbox={false} />}

        <div className="tweet-stats">
          <EmojiTweet
            parentTweetId={parentTweetId}
            tweetId={id}
            userPubKey={user?.publicAddress}
            reactions={reactions}
          />

          <div className="controls">
            <span className="comment">
              <Link to={`/${handle}/status/${id}`}>
                <CommentIcon />
                {commentsCount ? commentsCount : null}
              </Link>
            </span>
          </div>

          <div className="controls">
            <Retweet
              id={id}
              isRetweet={isRetweet}
              retweetsCount={retweetsCount}
            />
          </div>

          <>
            <TipCreator
              userPubKey={user?.publicAddress}
              tipAmount={tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL}
              tweetId={id}
              userId={user?.id}
            />
          </>

          {/* <div>
            <span>{isTweetMine ? <DeleteTweet id={id} /> : null}</span>
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

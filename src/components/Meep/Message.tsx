import React, { useContext } from "react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import Linkify from "linkify-react";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import { CommentIcon } from "../Icons";
import { EmojiTweet, Retweet } from "../Tweet/index";
import { ImageBox } from "../ImageBox";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { Link } from "react-router-dom";
import { List as ReactionsList } from "../Reactions/List";
import { NFTTweet } from "../NFT/NFTTweet";
import { TipCreator } from "../TipCreator";
import { styled } from "@mui/material/styles";
import { Tweet } from "../../generated/graphql";
import { VideoContainer } from "../Giphy/VideoContainer";
import { setDate } from "../../utils";
import { useReaction } from "../../hooks/useReaction";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";

interface Props {
  tweet: Tweet;
}

export const ShowMessage: React.FC<Props> = ({ tweet }: Props) => {
  const {
    id,
    text,
    // tags,
    user,
    files,
    gif,
    nft,
    // isTweetMine,
    parentTweet,
    isRetweet,
    retweetsCount,
    reactions,
    commentsCount,
    tipsCount,
    createdAt,
  } = tweet;

  const { theme } = useContext(ThemeContext);
  const { handleReaction } = useReaction({ tweetId: id });
  const handle = user && user.handle;

  const linkifyOptions = {
    className: "body",
    target: { url: "_blank" },
    formatHref: { hashtag: (href: any) => `explore?=${href.substring(1)}` },
  };

  return (
    <Grid item xs={12}>
      <Box display={"flex"}>
        <Box>
          <Link to={`/${handle}`}>
            <UserAvatar
              sx={{ width: "30px", height: "30px", border: `1px solid ${theme.tertiaryColor}` }}
              avatar={user?.avatar as string}
            />
          </Link>
        </Box>
        <Box ml={2}>
          <Box display={"flex"}>
            <Link to={`/${handle}`}>{user && user.consumerName}</Link>
            <Link to={`/${handle}/status/${id}`}>
              {moment(setDate(createdAt)).fromNow()}
            </Link>
          </Box>
          <Box>
            <Linkify options={linkifyOptions}>
              <Typography>{text}</Typography>
            </Linkify>
          </Box>
          <Box>
            {gif && <VideoContainer gif={gif} />}

            {nft && <NFTTweet nftData={nft} />}

            {files && !!files.length && (
              <ImageBox files={files} disablelightbox={false} />
            )}
          </Box>
          <Box display={"flex"}>
            {reactions && reactions.length > 0 && (
              <ReactionsList
                reactions={reactions}
                handleReaction={handleReaction}
                tweetId={id}
              />
            )}
            <EmojiTweet handleReaction={handleReaction} />

            <TipCreator
              userPubKey={user?.publicAddress}
              tipAmount={tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL}
              tweetId={id}
              userId={user?.id}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

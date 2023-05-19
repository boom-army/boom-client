import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import * as linkify from "linkifyjs";
import Linkify from "linkify-react";
import React, { useContext } from "react";
import moment from "moment";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { CommentIcon, HerofiedIcon } from "../Icons";
import { EmojiTweet, Retweet } from "./index";
import { ImageBox } from "../ImageBox";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { Link } from "react-router-dom";
import { List as ReactionsList } from "../Reactions/List";
import { NFTTweet } from "../NFT/NFTTweet";

import { TipCreator } from "../TipCreator";
import { TweetQuery, Reaction } from "../../generated/graphql";
import { UrlMetaData } from "../UrlMeta/UrlMetaData";
import { UserAvatar } from "../UserAvatar";
import { VideoContainer } from "../Giphy/VideoContainer";
import { setDate } from "../../utils";
import { styled } from "@mui/material/styles";
import { useReaction } from "../../hooks/useReaction";
import { HARKL_ID } from "../../utils/utils";
import { PopUpResponse } from "./PopUpResponse";
import { RoutePath } from "../../constants";

interface Props {
  tweet: TweetQuery["tweet"];
  threaded?: boolean;
  popUpResponse?: boolean;
  overideMt?: number;
}

const IconsStack = styled(Stack)((props) => ({
  "& svg": {
    width: "18px",
    height: "18px",
    "& path": {
      fill: props.theme.palette.secondary,
    },
  },
  "& :hover svg path": {
    fill: props.theme.accentColor,
  },
}));

export const ShowTweet: React.FC<Props> = ({
  tweet,
  threaded,
  popUpResponse,
  overideMt,
}: Props) => {
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
    parentTweet,
    tipsCount,
    createdAt,
  } = tweet;

  const theme = useTheme();
  const { handleReaction } = useReaction({
    tweetId: id,
    parentTweetId: parentTweet?.id,
  });
  const handle = user && user.handle;

  const extractUrls = linkify.find(text).filter((u) => u.type === "url");
  const targetUrl = extractUrls[0]?.href;

  const linkifyOptions = {
    nl2br: true,
    target: { url: "_blank" },
    formatHref: {
      hashtag: (href: any) => `explore?type=TAGS&term=${href.substring(1)}`,
    },
  };

  return (
    <Grid
      item
      xs={12}
      mt={overideMt ?? 2}
      sx={{
        position: "relative",
        padding: "0 0.25rem",
        display: "flex",
        maxWidth: "100vw",
      }}
    >
      <Box mr={1} position="relative">
        <Link to={`/${RoutePath.HANDLE_HASH}/${handle}`}>
          <UserAvatar
            className="avatar"
            avatar={user?.avatar as string}
            isNFT={user?.data?.avatarMint}
            sx={{
              width: "3rem",
              height: "3rem",
              marginTop: "0.2rem",
            }}
          />
        </Link>
        {threaded && (
          <Box
            sx={{
              borderLeft: `1px solid ${theme.tertiaryColor}`,
              height: "calc(100% - 2.7rem)",
              position: "absolute",
              left: "1.5rem",
              top: "3.6rem",
            }}
          />
        )}
      </Box>
      <Box mt={1} sx={{ flexWrap: "wrap", wordBreak: "break-word" }}>
        <Link to={`/${RoutePath.HANDLE_HASH}/${handle}`}>
          <Typography display={"inline"} sx={{ fontWeight: "600", mr: 0.5 }}>
            {user && user.consumerName}
          </Typography>
          <Typography display={"inline"} mr={0.5}>{`@${handle}`}</Typography>
          {user?.data?.avatarUpdateAuthority === HARKL_ID && (
            <Typography display={"inline"}>
              <HerofiedIcon
                sx={{
                  fill: theme.accentColor,
                  width: "1rem",
                  height: "1rem",
                  verticalAlign: "-2px",
                }}
              />
            </Typography>
          )}
        </Link>
        <Link
          to={`/${RoutePath.HANDLE_HASH}/handle/status/${id}`}
          className="secondary"
        >
          <Typography
            display={"inline"}
            sx={{ color: theme.palette.secondary.main }}
          >
            {" "}
            {moment(setDate(createdAt)).fromNow()}
          </Typography>
        </Link>
        <Linkify options={linkifyOptions}>
          <Typography
            mb={0.75}
            sx={{
              wordBreak: "break-word",
              a: { color: theme.accentColor },
            }}
          >
            {text}
          </Typography>
        </Linkify>
        <UrlMetaData url={targetUrl} />
        <Box>
          {gif && <VideoContainer gif={gif} />}
          {nft && <NFTTweet nftData={nft} />}
          {files && !!files.length && (
            <ImageBox files={files} disablelightbox={false} />
          )}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          {reactions && reactions.length > 0 && (
            <ReactionsList
              reactions={reactions as Reaction[]}
              handleReaction={handleReaction}
              tweetId={id}
            />
          )}
          <IconsStack
            ml={0.7}
            spacing={3}
            direction="row"
            alignItems={"baseline"}
          >
            <Box pt={0.6}>
              <EmojiTweet handleReaction={handleReaction} />
            </Box>

            {popUpResponse ? (
              <PopUpResponse
                commentsCount={commentsCount}
                parentTweet={tweet.id}
                masterTweet={tweet?.masterTweet?.id}
              />
            ) : (
              <Link to={`/${RoutePath.HANDLE_HASH}/handle/status/${id}`}>
                <Box display="flex" alignItems={"center"}>
                  <CommentIcon />
                  <Typography ml={0.5} color="secondary">
                    {commentsCount ? commentsCount : null}
                  </Typography>
                </Box>
              </Link>
            )}

            <Retweet
              id={id}
              isRetweet={isRetweet}
              retweetsCount={retweetsCount}
            />

            <TipCreator
              userPubKey={user?.publicAddress}
              tipAmount={tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL}
              tweetId={id}
              userId={user?.id}
            />

            {/* {isTweetMine ? <DeleteTweet id={id} /> : null} */}
          </IconsStack>
        </Box>
      </Box>
    </Grid>
  );
};

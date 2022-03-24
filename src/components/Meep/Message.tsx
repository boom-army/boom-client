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
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
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
    reactions,
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
    <Grid item xs={12} mt={2}>
      {parentTweet && (
        <Link to={`#`}>
          <Stack direction="row" pl={5}>
            <Box mr={0.5} pt={"2px"} sx={{ alignItems: "center" }}>
              <UserAvatar
                sx={{
                  width: "16px",
                  height: "16px",
                  border: `1px solid ${theme.tertiaryColor}`,
                }}
                avatar={parentTweet?.user?.avatar as string}
              />
            </Box>
            <Box mr={1}>
              <Typography variant="body2" sx={{ color: theme.secondaryColor }}>
                @{parentTweet?.user?.handle}
              </Typography>
            </Box>
            <Box
              pr={2}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "300",
                  color: theme.secondaryColor,
                }}
              >
                {parentTweet?.text}
              </Typography>
            </Box>
          </Stack>
        </Link>
      )}
      <Box display={"flex"}>
        <Box>
          <Link to={`/${handle}`}>
            <UserAvatar
              sx={{
                width: "30px",
                height: "30px",
                border: `1px solid ${theme.tertiaryColor}`,
              }}
              avatar={user?.avatar as string}
            />
          </Link>
        </Box>
        <Box ml={1} pt={0.5}>
          <Stack direction="row">
            <Box mr={1}>
              <Link to={`/${handle}`}>
                <Typography sx={{ fontWeight: "600" }}>
                  {user && user.consumerName}
                </Typography>
              </Link>
            </Box>
            <Link to={`/${handle}/status/${id}`}>
              <Typography sx={{ color: theme.secondaryColor }}>
                {moment(setDate(createdAt)).fromNow()}
              </Typography>
            </Link>
          </Stack>
          <Box mb={0.5} pr={2}>
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
            {reactions && (
              <Box mr={1}>
                {reactions.length > 0 && (
                  <ReactionsList
                    reactions={reactions}
                    handleReaction={handleReaction}
                    tweetId={id}
                  />
                )}
              </Box>
            )}
            <Box mr={1}>
              <EmojiTweet handleReaction={handleReaction} />
            </Box>
            <Box mr={1}>
              <TipCreator
                userPubKey={user?.publicAddress}
                tipAmount={tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL}
                tweetId={id}
                userId={user?.id}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

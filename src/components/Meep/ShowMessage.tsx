import React, { useContext } from "react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import Linkify from "linkify-react";
import ReplyIcon from "@mui/icons-material/Reply";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { EmojiTweet } from "../Tweet/index";
import { HashLink } from "react-router-hash-link";
import { ImageBox } from "../ImageBox";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { Link } from "react-router-dom";
import { List as ReactionsList } from "../Reactions/List";
import { NFTTweet } from "../NFT/NFTTweet";
import { RecoilState, useSetRecoilState } from "recoil";
import { ThemeContext } from "../../contexts/theme";
import { TipCreator } from "../TipCreator";
import { Tweet } from "../../generated/graphql";
import { VideoContainer } from "../Giphy/VideoContainer";
import { setDate } from "../../utils";
import { styled } from "@mui/material/styles";
import { useReaction } from "../../hooks/useReaction";

const ReplyBox = styled(Box)((props) => ({
  "&:before": {
    width: "1.5em",
    height: "0.7em",
    borderLeft: `solid 2px ${props.theme.accentColor}`,
    borderTop: `solid 2px ${props.theme.accentColor}`,
    borderColor: `${props.theme.accentColor} transparent transparent ${props.theme.accentColor}`,
    borderRadius: "1em 0 0 1em",
    content: '""',
    display: "block",
    position: "absolute",
    WebkitBoxSizing: "border-box",
    boxSizing: "border-box",
    top: "30%",
    left: "0.7em",
  },
}));

interface Props {
  tweet: Tweet;
  parentTweetState: RecoilState<string>;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

export const ShowMessage: React.FC<Props> = ({
  tweet,
  parentTweetState,
  scrollRef,
}: Props) => {
  const {
    id,
    text,
    channel,
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
  const setParentTweetState = useSetRecoilState(parentTweetState);
  const handle = user && user.handle;

  const linkifyOptions = {
    className: "body",
    target: { url: "_blank" },
    formatHref: { hashtag: (href: any) => `explore?=${href.substring(1)}` },
  };

  return (
    <Grid item xs={12} mt={2} sx={{ position: "relative" }}>
      {parentTweet && (
        <Box sx={{ position: "relative" }}>
          <ReplyBox>
            <HashLink to={`/channels/${channel?.id}#${parentTweet?.id}`}>
              <Stack direction="row" pl={5}>
                <Box mr={0.5} pt={"2px"} sx={{ alignItems: "center" }}>
                  <UserAvatar
                    sx={{
                      width: 16,
                      height: 16,
                      border: `1px solid ${theme.tertiaryColor}`,
                    }}
                    avatar={parentTweet?.user?.avatar as string}
                  />
                </Box>
                <Box mr={1}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.secondaryColor }}
                  >
                    @{parentTweet?.user?.handle}
                  </Typography>
                </Box>
                <Box
                  pr={2}
                  sx={{
                    flex: 1,
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
            </HashLink>
          </ReplyBox>
        </Box>
      )}
      <Box sx={{ position: "absolute", right: 0, top: -4 }}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            background: theme.background2,
            border: `1px solid ${theme.tertiaryColor}`,
            padding: "0.2em 1em",
            borderRadius: "5px",
            alignContent: "baseline",
          }}
        >
          <Box pt={"3px"}>
            <EmojiTweet handleReaction={handleReaction} />
          </Box>
          <TipCreator
            userPubKey={user?.publicAddress}
            tipAmount={tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL}
            tweetId={id}
            userId={user?.id}
            hideAmount={true}
          />
          <IconButton
            onClick={() => {
              setParentTweetState(id);
              scrollRef?.current?.scrollIntoView();
            }}
          >
            <ReplyIcon sx={{ color: theme.secondaryColor }} />
          </IconButton>
        </Stack>
      </Box>
      <Box id={tweet?.id} display={"flex"}>
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
          <Stack direction={"row"} spacing={2} alignItems="baseline">
            {reactions && reactions.length > 0 && (
              <>
                <ReactionsList
                  reactions={reactions}
                  handleReaction={handleReaction}
                  tweetId={id}
                />
                <Box>
                  <EmojiTweet handleReaction={handleReaction} />
                </Box>
              </>
            )}
            {tipsCount && parseInt(tipsCount) ? (
              <Box sx={{ alignContent: "baseline" }}>
                <TipCreator
                  userPubKey={user?.publicAddress}
                  tipAmount={
                    tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL
                  }
                  tweetId={id}
                  userId={user?.id}
                />
              </Box>
            ) : null}
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
};
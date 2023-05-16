import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import Linkify from "linkify-react";
import React, { useContext, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import moment from "moment";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { EmojiTweet } from "../Tweet/index";
import { HashLink } from "react-router-hash-link";
import { ImageBox } from "../ImageBox";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { Link } from "react-router-dom";
import { List as ReactionsList } from "../Reactions/List";
import { NFTTweet } from "../NFT/NFTTweet";
import { Popover } from "@mui/material";
import { RecoilState, useSetRecoilState } from "recoil";

import { TipCreator } from "../TipCreator";
import { Tweet } from "../../generated/graphql";
import { UserAvatar } from "../UserAvatar";
import { VideoContainer } from "../Giphy/VideoContainer";
import { setDate } from "../../utils";
import { styled } from "@mui/material/styles";
import { useReaction } from "../../hooks/useReaction";
import { RoutePath } from "../../constants";

export const ReplyBox = styled(Box)(({ theme }) => ({
  "&:before": {
    width: "1.5em",
    height: "0.7em",
    borderLeft: `solid 2px ${theme.accentColor}`,
    borderTop: `solid 2px ${theme.accentColor}`,
    borderColor: `${theme.accentColor} transparent transparent ${theme.accentColor}`,
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

const IconsBox = styled(Box)(({ theme }) => ({
  "& svg": {
    width: "18px",
    height: "18px",
    "& path": {
      fill: theme.palette.secondary,
    },
  },
  "& :hover svg path": {
    fill: theme.accentColor,
  },
}));

const MeepBody = styled(Typography)(({ theme }) => ({
  a: { color: theme.accentColor },
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

  const theme = useTheme();
  const { handleReaction } = useReaction({ tweetId: id });
  const setParentTweetState = useSetRecoilState(parentTweetState);
  const [popAnchor, setPopAnchor] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopAnchor(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopAnchor(null);
  };
  const popOpen = Boolean(popAnchor);
  const handle = user && user.handle;

  const linkifyOptions = {
    className: "body",
    nl2br: true,
    target: { url: "_blank" },
    formatHref: {
      hashtag: (href: any) => `explore?type=TAGS&term=${href.substring(1)}`,
    },
  };

  return (
    <Grid item xs={12} mt={2} sx={{ position: "relative", padding: "0 1em" }}>
      {parentTweet && (
        <Box sx={{ position: "relative" }}>
          <ReplyBox>
            <HashLink
              to={`/${RoutePath.DAO}/${channel?.id}#${parentTweet?.id}`}
            >
              <Stack direction="row" pl={5}>
                <Box mr={0.5} pt={"2px"} sx={{ alignItems: "center" }}>
                  <UserAvatar
                    sx={{
                      width: 16,
                      height: 16,
                    }}
                    avatar={parentTweet?.user?.avatar as string}
                    isNFT={parentTweet?.user?.data?.avatarMint}
                  />
                </Box>
                <Box mr={1}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.secondary }}
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
                      color: theme.palette.secondary,
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
      <Popover
        id="mouse-over-popover"
        open={popOpen}
        anchorEl={popAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus={true}
      >
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            background: theme.background2,
            border: `1px solid ${theme.tertiaryColor}`,
            padding: "0.2em 1em",
            borderRadius: "5px",
            alignItems: "baseline",
          }}
        >
          <EmojiTweet handleReaction={handleReaction} />
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
              handlePopoverClose();
              scrollRef?.current?.scrollIntoView();
            }}
            sx={{ padding: "0.2em" }}
          >
            <ReplyIcon
              sx={{
                color: theme.palette.secondary,
                "&:hover": { color: theme.accentColor },
              }}
            />
          </IconButton>
        </Stack>
      </Popover>
      <Box
        id={tweet?.id}
        display={"flex"}
        aria-owns={popOpen ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
        sx={{
          "&:hover": {
            backgroundColor: theme.tertiaryColor2,
            cursor: "pointer",
          },
        }}
      >
        <Box>
          <Link to={`/${RoutePath.HANDLE_HASH}/${handle}`}>
            <UserAvatar
              sx={{
                width: "30px",
                height: "30px",
              }}
              avatar={user?.avatar as string}
              isNFT={user?.data?.avatarMint}
            />
          </Link>
        </Box>
        <Box ml={1} pt={0.5}>
          <Stack direction="row">
            <Box mr={1}>
              <Link to={`/${RoutePath.HANDLE_HASH}/${handle}`}>
                <Typography sx={{ fontWeight: "600" }}>
                  {user && user.consumerName}
                </Typography>
              </Link>
            </Box>
            <Typography sx={{ color: theme.palette.secondary }}>
              {moment(setDate(createdAt)).fromNow()}
            </Typography>
          </Stack>
          <Box mb={0.5} pr={2}>
            <Linkify options={linkifyOptions}>
              <MeepBody>{text}</MeepBody>
            </Linkify>
          </Box>
          <Box>
            {gif && <VideoContainer gif={gif} />}

            {nft && <NFTTweet nftData={nft} />}

            {files && !!files.length && (
              <ImageBox files={files} disablelightbox={false} />
            )}
          </Box>
          <IconsBox display="flex" alignItems="center">
            {reactions && reactions.length > 0 && (
              <>
                <ReactionsList
                  reactions={reactions}
                  // @ts-ignore
                  handleReaction={handleReaction}
                  tweetId={id}
                />
                <Box ml={1} pt={0.7}>
                  <EmojiTweet handleReaction={handleReaction} />
                </Box>
              </>
            )}
            {tipsCount && parseInt(tipsCount) ? (
              <Box ml={2}>
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
          </IconsBox>
        </Box>
      </Box>
    </Grid>
  );
};

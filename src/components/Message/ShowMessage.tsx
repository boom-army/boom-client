import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import Linkify from "linkify-react";
import React, { useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { EmojiTweet } from "../Tweet/index";
import { ImageBox } from "../ImageBox";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { Link } from "react-router-dom";
import { List as ReactionsList } from "../Reactions/List";
import { NFTTweet } from "../NFT/NFTTweet";
import { Popover } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { TipCreator } from "../TipCreator";
import { Maybe, Tweet, User } from "../../generated/graphql";
import { UserAvatar } from "../UserAvatar";
import { VideoContainer } from "../Giphy/VideoContainer";
import { styled } from "@mui/material/styles";
import { useReaction } from "../../hooks/useReaction";
import { RoutePath } from "../../constants";
import dayjs from "dayjs";
import { setDate } from "../../utils";
import { parentMeepState } from "../../hooks/useParentMeepState";

const IconsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  mr: "2px",
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

interface Props {
  tweet: Tweet;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

interface MessageBoxProps {
  children: React.ReactNode;
  user: Maybe<User> | undefined;
  parentTweet: Maybe<Tweet> | undefined;
  isTweetMine: boolean;
}

const BubbleRight = styled(Paper)(({ theme }) => ({
  background: alpha(theme.accentColor, 0.2),
  color: theme.palette.text.primary,
  padding: "0.5rem 1rem",
  marginBottom: theme.spacing(1),
  position: "relative",
  borderRadius: "16px 0 16px 16px",
  wordBreak: "break-word",
  width: "100%",
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: "-8px",
    width: 0,
    height: 0,
    borderTop: `8px solid ${alpha(theme.accentColor, 0.2)}`,
    borderRight: "8px solid transparent",
  },
}));

const BubbleLeft = styled(Paper)(({ theme }) => ({
  background: theme.blue.dark,
  color: theme.palette.text.primary,
  padding: "0.5rem 1rem",
  marginBottom: theme.spacing(1),
  position: "relative",
  borderRadius: "0 16px 16px 16px",
  wordBreak: "break-word",
  width: "100%",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-8px",
    width: 0,
    height: 0,
    borderTop: `8px solid ${theme.blue.dark}`,
    borderLeft: "8px solid transparent",
  },
}));

const MessageBox: React.FC<MessageBoxProps> = ({
  children,
  user,
  parentTweet,
  isTweetMine,
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent={isTweetMine ? "flex-end" : "flex-start"}
    >
      <Stack direction="column" mb={0.5} pr={2} display="flex" maxWidth="70%">
        {parentTweet && (
          <Box
            sx={{
              borderLeft: `1px solid ${theme.tertiaryColor}`,
              pl: 1,
              mb: 0.5,
              ml: isTweetMine ? 0 : 5,
              overflow: "hidden",
            }}
          >
            <Typography
              color="secondary"
              display="inline"
              sx={{ fontSize: "0.9rem" }}
            >
              @{parentTweet?.user?.handle}
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              display="inline"
              sx={{
                fontWeight: "300",
                width: "100%",
                ml: 0.5,
              }}
            >
              {parentTweet?.text}
            </Typography>
          </Box>
        )}
        <Box display="flex">
          {!isTweetMine && (
            <Box mr={1}>
              <Link to={`/${RoutePath.HANDLE_HASH}/${user?.handle}`}>
                <UserAvatar
                  sx={{
                    width: "30px",
                    height: "30px",
                  }}
                  avatar={user?.avatar as string}
                  handle={user?.handle}
                  isNFT={user?.data?.avatarMint}
                />
              </Link>
            </Box>
          )}

          {isTweetMine ? (
            <BubbleRight>{children}</BubbleRight>
          ) : (
            <BubbleLeft>{children}</BubbleLeft>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export const ShowMessage: React.FC<Props> = ({ tweet, scrollRef }: Props) => {
  const {
    id,
    text,
    channel,
    // tags,
    user,
    files,
    gif,
    nft,
    isTweetMine,
    parentTweet,
    reactions,
    tipsCount,
    createdAt,
  } = tweet;

  const theme = useTheme();
  const { handleReaction } = useReaction({ tweetId: id });
  const setParentMeepState = useSetRecoilState(parentMeepState);
  const [popAnchor, setPopAnchor] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopAnchor(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopAnchor(null);
  };
  const popOpen = Boolean(popAnchor);

  const currentDate = dayjs();
  const createdDate = dayjs(setDate(createdAt));
  let formattedDate = createdDate.format("HH:mm");
  if (!currentDate.isSame(createdDate, "day")) {
    formattedDate = createdDate.format("ddd") + " " + formattedDate;
  }

  const linkifyOptions = {
    nl2br: true,
    target: { url: "_blank" },
    formatHref: {
      hashtag: (href: string) => `/explore?type=TAGS&term=${href.substring(1)}`,
      mention: (href: string) =>
        `/${RoutePath.HANDLE_HASH}/${href.substring(1)}`,
    },
  };

  return (
    <Grid item xs={12} mt={1} sx={{ position: "relative", padding: "0 1em" }}>
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
            fontSize={23}
          />
          <IconButton
            onClick={() => {
              setParentMeepState(tweet);
              handlePopoverClose();
              scrollRef?.current?.scrollIntoView();
            }}
            sx={{ padding: "0.2em" }}
          >
            <ReplyIcon
              color="secondary"
              sx={{
                "&:hover": { color: theme.accentColor },
              }}
            />
          </IconButton>
        </Stack>
      </Popover>
      <Box
        id={tweet?.id}
        display="flex"
        width="100%"
        aria-owns={popOpen ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onClick={(e) => !isTweetMine && handlePopoverOpen(e)}
        sx={{
          "&:hover": {
            cursor: !isTweetMine ? "pointer" : "inherit",
          },
        }}
      >
        <Box width="100%">
          <MessageBox
            parentTweet={parentTweet}
            user={user}
            isTweetMine={isTweetMine}
          >
            {!isTweetMine && (
              <Typography sx={{ fontWeight: "600" }}>
                {user && user.consumerName}
              </Typography>
            )}
            <Linkify options={linkifyOptions}>
              <Typography
                sx={{
                  wordBreak: "break-word",
                  a: { color: theme.accentColor },
                }}
              >
                {text}
              </Typography>
            </Linkify>
            <Box>
              {gif && (
                <Box mt={1}>
                  <VideoContainer gif={gif} />
                </Box>
              )}

              {nft && <NFTTweet nftData={nft} />}

              {files && !!files.length && (
                <ImageBox files={files} disablelightbox={false} />
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={0.5}
            >
              <IconsBox display="flex" alignItems="center" mr={2}>
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
              <Typography
                color="secondary"
                variant="body2"
                textAlign="right"
                sx={{ minWidth: "4rem" }}
              >
                {formattedDate}
              </Typography>
            </Box>
          </MessageBox>
        </Box>
      </Box>
    </Grid>
  );
};

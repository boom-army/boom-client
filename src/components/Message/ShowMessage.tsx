import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import Linkify from "linkify-react";
import React, { useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EmojiTweet } from "../Tweet/index";
import { ImageBox } from "../ImageBox";
import { LAMPORTS_PER_SOL } from "../../constants/math";
import { Link } from "react-router-dom";
import { List as ReactionsList } from "../Reactions/List";
import { NFTTweet } from "../NFT/NFTTweet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { EmojiMessage } from "./EmojiMessage";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      display="flex"
      justifyContent={isTweetMine ? "flex-end" : "flex-start"}
    >
      <Stack
        direction="column"
        mb={0.5}
        pr={2}
        display="flex"
        maxWidth={isMobile ? "100%" : "80%"}
      >
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
  const setParentMeepState = useSetRecoilState(parentMeepState);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { handleReaction } = useReaction({ tweetId: id, handleClose });

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
    <Grid item xs={12}>
      <Box
        id={tweet?.id}
        display="flex"
        width="100%"
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
            {!isTweetMine ? (
              <>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  size="small"
                  onClick={handleClick}
                  sx={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                >
                  <ExpandMoreIcon sx={{ fontSize: 18 }} color="secondary" />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                  }}
                >
                  <MenuItem key="EmojiMessage" onClick={() => handleReaction}>
                    <EmojiMessage
                      handleReaction={handleReaction}
                      handleClose={handleClose}
                    />
                  </MenuItem>
                  <MenuItem
                    key="TipCreator"
                    onClick={() => {
                      scrollRef?.current?.scrollIntoView();
                    }}
                  >
                    <TipCreator
                      userPubKey={user?.publicAddress}
                      tipAmount={
                        tipsCount && parseInt(tipsCount) / LAMPORTS_PER_SOL
                      }
                      tweetId={id}
                      userId={user?.id}
                      hideAmount={true}
                      fontSize={23}
                      label="Tip this meep"
                    />
                  </MenuItem>
                  <MenuItem
                    key="ReplyIcon"
                    onClick={() => {
                      setParentMeepState(tweet);
                      handleClose();
                      scrollRef?.current?.scrollIntoView();
                    }}
                  >
                    <ReplyIcon
                      color="secondary"
                      sx={{
                        "&:hover": { color: theme.accentColor },
                      }}
                    />
                    <Typography variant="body2" display="inline" pl={1}>
                      Reply to {user?.handle}
                    </Typography>
                  </MenuItem>
                </Menu>
                <Typography sx={{ fontWeight: "600" }}>
                  {user && user.consumerName}
                </Typography>
              </>
            ) : null}
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

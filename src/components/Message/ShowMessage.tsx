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
import { RecoilState, useSetRecoilState } from "recoil";
import { TipCreator } from "../TipCreator";
import { Tweet } from "../../generated/graphql";
import { UserAvatar } from "../UserAvatar";
import { VideoContainer } from "../Giphy/VideoContainer";
import { styled } from "@mui/material/styles";
import { useReaction } from "../../hooks/useReaction";
import { RoutePath } from "../../constants";
import dayjs from "dayjs";
import { setDate } from "../../utils";
import { parentMeepState } from "../../hooks/useParentMeepState";

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

interface Props {
  tweet: Tweet;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

interface MessageBoxProps {
  children: React.ReactNode;
  isTweetMine: boolean;
}

const BubbleRight = styled(Paper)(({ theme }) => ({
  background: alpha(theme.accentColor, 0.2),
  color: theme.palette.text.primary,
  maxWidth: "100%",
  minWidth: "60%",
  padding: "0.5rem 1rem",
  marginBottom: theme.spacing(1),
  position: "relative",
  borderRadius: "16px 0 16px 16px",
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
  maxWidth: "100%",
  minWidth: "60%",
  padding: "0.5rem 1rem",
  marginBottom: theme.spacing(1),
  position: "relative",
  borderRadius: "0 16px 16px 16px",
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

const MessageBox: React.FC<MessageBoxProps> = ({ children, isTweetMine }) => {
  const linkifyOptions = {
    className: "body",
    nl2br: true,
    target: { url: "_blank" },
    formatHref: {
      hashtag: (href: any) => `explore?type=TAGS&term=${href.substring(1)}`,
      mention: (href: string) => `/${RoutePath.HANDLE_HASH}/${href.substring(1)}`,
    },
  };
  return (
    <Box
      mb={0.5}
      pr={2}
      display="flex"
      justifyContent={isTweetMine ? "flex-end" : "flex-start"}
      width="100%"
    >
      <Linkify options={linkifyOptions}>
        {isTweetMine ? (
          <BubbleRight>{children}</BubbleRight>
        ) : (
          <BubbleLeft>{children}</BubbleLeft>
        )}
      </Linkify>
    </Box>
  );
};

export const ShowMessage: React.FC<Props> = ({
  tweet,
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
  const handle = user && user.handle;

  const currentDate = dayjs();
  const createdDate = dayjs(setDate(createdAt));
  let formattedDate = createdDate.format("HH:mm");
  if (!currentDate.isSame(createdDate, "day")) {
    formattedDate = createdDate.format("ddd") + " " + formattedDate;
  }

  return (
    <Grid item xs={12} mt={2} sx={{ position: "relative", padding: "0 1em" }}>
      {parentTweet && (
        <Box
          display="flex"
          justifyContent={isTweetMine ? "flex-end" : "flex-start"}
          width="100%"
        >
          <Box width="60%" ml={isTweetMine ? 0 : 5}>
            <Stack direction="row">
              <Box mr={1}>
                <Typography variant="body2" color="secondary">
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
                  color="secondary"
                  sx={{
                    fontWeight: "300",
                  }}
                >
                  {parentTweet?.text}
                </Typography>
              </Box>
            </Stack>
          </Box>
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
            fontSize={23}
          />
          <IconButton
            onClick={() => {
              setParentMeepState(id);
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
            backgroundColor: !isTweetMine ? theme.tertiaryColor2 : "inherit",
            cursor: !isTweetMine ? "pointer" : "inherit",
          },
        }}
      >
        {!isTweetMine && (
          <Box>
            <Link to={`/${RoutePath.HANDLE_HASH}/${handle}`}>
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
        <Box ml={1} pt={0.5} width="100%">
          <MessageBox isTweetMine={isTweetMine}>
            {!isTweetMine && (
              <Typography sx={{ fontWeight: "600" }}>
                {user && user.consumerName}
              </Typography>
            )}
            <Typography>{text}</Typography>
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
              <Typography color="secondary" variant="body2">
                {formattedDate}
              </Typography>
            </Box>
          </MessageBox>
        </Box>
      </Box>
    </Grid>
  );
};

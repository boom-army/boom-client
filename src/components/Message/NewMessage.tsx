import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";
import { AttributionLink } from "../Giphy/AttributionLink";
import {
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  GetChannelDocument,
  FeedDocument,
  TweetDocument,
  useNewTweetMutation,
  useUpdateTypingStatusMutation,
} from "../../generated/graphql";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { GifyModal } from "../Giphy/GifyModal";
import { ImageBox } from "../ImageBox";
import { NFTPicker } from "../NFT/NFTPicker";
import { NFTTweet } from "../NFT/NFTTweet";
import { useRecoilState } from "recoil";
import { SIGN_FILE } from "../../queries/files";

import { UploadFileIcon } from "../Icons";
import { VideoContainer } from "../Giphy/VideoContainer";
import { client } from "../../apollo/client";
import { displayError, uploadFile } from "../../utils";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { useMutation, gql } from "@apollo/client";
import { useSnackbar } from "../../contexts/snackbar";
import { UserAvatar } from "../UserAvatar";
import { parentMeepState } from "../../hooks/useParentMeepState";
import { BOOM_CHANNEL_ID } from "../../utils/ids";
import { UserContext } from "../../contexts/user";

interface Props {
  channelId?: string | null | undefined;
  scrollRef: React.MutableRefObject<HTMLDivElement | undefined>;
  typingHandler: () => void;
}

const IconsGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  "& svg": {
    fill: theme.accentColor,
    width: "22px",
    height: "20px",
    marginRight: "1em",
    "& path": {
      fill: theme.accentColor,
    },
  },
}));

const ImageInput = styled("input")({
  display: "none",
});

export const NewMessage: React.FC<Props> = ({
  channelId,
  scrollRef,
  typingHandler,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();
  const [gif, setGif]: any = useState(null);
  const [nftData, setNftData] = useState(null);
  const [tweetFiles, setTweetFiles]: any = useState([]);
  const tweet = useInput("");
  const { user } = useContext(UserContext);

  const [parentTweet, setParentMeepState] = useRecoilState(parentMeepState);

  const [newTweetMutation, { loading }] = useNewTweetMutation({
    refetchQueries: [
      FeedDocument,
      GetChannelDocument,
      {
        query: TweetDocument,
        variables: { id: parentTweet },
      },
    ],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);
  const channelData = client.readFragment({
    id: `Channel:${channelId}`,
    fragment: gql`
      fragment TweetChannel on Channel {
        id
        name
        family
      }
    `,
  });
  const [updateTypingStatusMutation] = useUpdateTypingStatusMutation();

  const createGifInput = (gif: any) => ({
    title: gif.title,
    fixedHeightUrl: gif.images.fixed_height.mp4,
    originalUrl: gif.images.original.mp4,
  });

  const handleNewTweet = async (e: any) => {
    e.preventDefault();

    // a tweet can have no text body if it has a gif
    if (!tweet.value && !gif && !tweetFiles.length && !nftData)
      return enqueueSnackbar("Write something...", { variant: "info" });

    const tags = tweet.value.split(" ").filter((str) => str.startsWith("#"));
    const mentions = tweet.value
      .split(" ")
      .filter((str) => str.startsWith("@"));

    try {
      await newTweetMutation({
        variables: {
          text: tweet.value,
          tags,
          mentions,
          gif: gif ? createGifInput(gif) : null,
          nft: nftData,
          files: tweetFiles,
          parentTweet: parentTweet?.id ?? undefined,
          channel: channelId,
        },
      });

      setNftData(null);
      enqueueSnackbar("Your meep has been posted", { variant: "success" });
    } catch (err) {
      console.log(err);
      return displayError(err, enqueueSnackbar);
    } finally {
      updateTypingStatusMutation({
        variables: { channelId: BOOM_CHANNEL_ID, isTyping: false },
      });
    }

    tweet.setValue("");
    setTweetFiles([]);
    setGif(null);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleNewTweet(event);
    }
  };

  const handleTweetFiles = async (e: any) => {
    try {
      if (tweetFiles.length >= 4) {
        return enqueueSnackbar("You can only upload a maximum of 4 files", {
          variant: "error",
        });
      }

      const file = e.target.files[0];
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadFile(file, signedUrl, enqueueSnackbar);
      const imageUrl = imageData?.config?.url?.split("?")[0];
      setTweetFiles([...tweetFiles, imageUrl]);
    } catch (error) {
      console.log(error);
    } finally {
      // reset value so the input event handler can trigger again
      e.target.value = null;
    }
  };

  const mapTweetFiles = (url: string, index: number) => ({
    url,
    id: `preview-${index}`,
  });

  return (
    <Box
      height={parentTweet ? "13.5rem" : "9.5rem"}
      sx={{
        marginBottom: isMobile ? "56px" : 0,
      }}
    >
      {parentTweet && (
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            backgroundColor: theme.blue.lighter,
            padding: "0.5em 2em 0.5em 1em",
          }}
        >
          <Stack spacing={1} direction="row">
            <ReplyIcon sx={{ color: theme.blue.lightest }} />
            <Box>
              <Typography fontWeight={200} display="inline">
                Replying to
              </Typography>
              {parentTweet.user ? (
                <Typography
                  ml={0.5}
                  display="inline"
                  sx={{ wordBreak: "break-all" }}
                >
                  @{parentTweet?.user.consumerName}
                </Typography>
              ) : null}
            </Box>
          </Stack>
          <Box>
            <IconButton
              onClick={() => {
                setParentMeepState(null);
              }}
              sx={{ padding: "0" }}
            >
              <CloseIcon sx={{ color: theme.blue.lightest }} />
            </IconButton>
          </Box>
        </Box>
      )}
      <Grid
        container
        p={2}
        sx={{
          borderTop: `2px solid ${theme.tertiaryColor}`,
          "@media (max-width: 900px)": {
            marginBottom: "4em",
          },
        }}
      >
        <Grid item xs={12} pb={2}>
          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <UserAvatar
              sx={{
                width: 30,
                height: 30,
              }}
              avatar={user?.avatar}
              handle={user?.handle}
              isNFT={user?.data?.avatarMint}
            />
            <Input
              value={tweet.value}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                typingHandler();
                return tweet.onChange(e);
              }}
              placeholder={`Meep in # ${channelData?.family} ${channelData?.name}`}
              fullWidth={true}
              autoFocus={true}
              ref={scrollRef}
              sx={{
                color: theme.palette.text.primary,
                padding: "1em 1em 1em 0",
                "&:before": {
                  borderColor: theme.tertiaryColor2,
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderColor: theme.tertiaryColor2,
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <EmojiPicker
                    emojiHandler={(pickedEmoji: any) =>
                      tweet.setValue(tweet.value + pickedEmoji.native)
                    }
                  />
                </InputAdornment>
              }
            />
          </Stack>
        </Grid>

        <IconsGrid item xs={6} pl={6}>
          {gif && (
            <Box sx={{ marginBottom: 2 }}>
              <Stack direction="column">
                <VideoContainer
                  gif={createGifInput(gif)}
                  onClose={() => setGif(null)}
                />
                <AttributionLink src={gif.url} />
              </Stack>
            </Box>
          )}

          {nftData && <NFTTweet nftData={nftData} />}

          {!!tweetFiles.length && (
            <ImageBox files={tweetFiles.map(mapTweetFiles)} />
          )}

          {!tweetFiles.length && !nftData && <GifyModal setGif={setGif} />}

          {!gif && !nftData && (
            <>
              <label htmlFor="icon-button-file">
                <ImageInput
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleTweetFiles}
                />
                <IconButton aria-label="upload image" component="span">
                  <UploadFileIcon />
                </IconButton>
              </label>
            </>
          )}

          {!tweetFiles.length && !gif && <NFTPicker setNftData={setNftData} />}
        </IconsGrid>
        <Grid item xs={6} pr={1}>
          <Box display={"flex"} sx={{ justifyContent: "flex-end" }}>
            <IconButton
              disabled={loading}
              onClick={(e) => {
                setParentMeepState(null);
                handleNewTweet(e);
              }}
            >
              <SendIcon sx={{ color: theme.accentColor }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

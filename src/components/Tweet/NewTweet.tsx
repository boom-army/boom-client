import Button from "../../styles/Button";
import { AttributionLink } from "../Giphy/AttributionLink";
import { Box } from "@mui/system";
import {
  ChannelFeedDocument,
  FeedDocument,
  useMeQuery,
  useNewTweetMutation,
} from "../../generated/graphql";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { ImageBox } from "../ImageBox";
import { NFTPicker } from "../NFT/NFTPicker";
import { NFTTweet } from "../NFT/NFTTweet";
import { SIGN_FILE } from "../../queries/files";
import { GifyModal } from "../Giphy/GifyModal";
import {
  Stack,
  Grid,
  InputAdornment,
  Input,
  IconButton,
} from "@mui/material";
import { TWEET } from "../../queries/tweet";
import { UploadFileIcon } from "../Icons";
import { VideoContainer } from "../Giphy/VideoContainer";
import { displayError, uploadFile } from "../../utils";
import { useInput } from "../../hooks/useInput";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "../../contexts/snackbar";
import { ThemeContext } from "../../contexts/theme";
import { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import { UserAvatar } from "../UserAvatar";

interface NewTweetProps {
  feed?: any;
  parentTweet?: string | undefined;
  channel?: string | undefined;
}

const IconsGrid = styled(Grid)((props) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  "& svg": {
    fill: props.theme.accentColor,
    width: "20px",
    height: "20px",
    marginRight: "1em",
    "& path": {
      fill: props.theme.accentColor,
    },
  },
}));

const ImageInput = styled("input")({
  display: "none",
});

export const NewTweet = ({ feed, parentTweet, channel }: NewTweetProps) => {
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const [gif, setGif]: any = useState(null);
  const [nftData, setNftData] = useState(null);
  const [tweetFiles, setTweetFiles]: any = useState([]);
  const tweet = useInput("");

  const [newTweetMutation, { loading }] = useNewTweetMutation({
    refetchQueries: [
      FeedDocument,
      ChannelFeedDocument,
      {
        query: TWEET,
        variables: { id: parentTweet },
      },
    ],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

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
          parentTweet,
          channel,
        },
      });

      setNftData(null);
      enqueueSnackbar("Your meep has been posted", { variant: "success" });
    } catch (err) {
      console.log(err);
      return displayError(err, enqueueSnackbar);
    }

    tweet.setValue("");
    setTweetFiles([]);
    setGif(null);
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

  const { data } = useMeQuery();

  const mapTweetFiles = (url: string, index: number) => ({
    url,
    id: `preview-${index}`,
  });

  return (
    <Grid
      container
      p={2}
      sx={{
        borderBottom: `2px solid ${theme.tertiaryColor}`,
      }}
    >
      <Grid item xs={12} pb={2}>
        <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
          <UserAvatar
            sx={{
              width: 40,
              height: 40,
            }}
            avatar={data?.me?.avatar}
            isNFT={data?.me?.data?.avatarIsNFT ?? false}
          />
          <Input
            value={tweet.value}
            onChange={tweet.onChange}
            placeholder={"What's happening?"}
            fullWidth={true}
            autoFocus={true}
            sx={{
              color: theme.primaryColor,
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
          <Button sm="true" disabled={loading} onClick={handleNewTweet}>
            Post
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

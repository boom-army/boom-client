import { AttributionLink } from "../Giphy/AttributionLink";
import { Box } from "@mui/system";
import {
  GetUserChannelsDocument,
  FeedDocument,
  TweetDocument,
  useNewTweetMutation,
  HeroFeedDocument,
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
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import { UploadFileIcon } from "../Icons";
import { VideoContainer } from "../Giphy/VideoContainer";
import { displayError, getUniqueFileName, uploadFile } from "../../utils";
import { useInput } from "../../hooks/useInput";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "../../contexts/snackbar";

import { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { UserAvatar } from "../UserAvatar";
import { UserContext } from "../../contexts/user";

interface NewTweetProps {
  parentTweet?: string | undefined;
  masterTweet?: string | undefined;
  channel?: string | undefined;
  closePopUp?: () => void;
}

const IconsGrid = styled(Grid)((props) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  "& svg": {
    fill: props.theme.accentColor,
    width: "22px",
    height: "20px",
    marginRight: "0.7em",
    "& path": {
      fill: props.theme.accentColor,
    },
  },
}));

export const NewTweet = ({
  parentTweet,
  masterTweet,
  channel,
  closePopUp,
}: NewTweetProps) => {
  const theme = useTheme();
  const { user: userData } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [gif, setGif]: any = useState(null);
  const [nftData, setNftData] = useState(null);
  const [tweetFiles, setTweetFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const tweet = useInput("");

  const [newTweetMutation, { loading }] = useNewTweetMutation({
    refetchQueries: [
      FeedDocument,
      HeroFeedDocument,
      GetUserChannelsDocument,
      {
        query: TweetDocument,
        variables: { id: parentTweet },
      },
    ],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  useEffect(() => {
    if (uploadProgress > 0) {
      enqueueSnackbar("Uploading...", {
        variant: "info",
        progress: uploadProgress,
      });
    }
  }, [uploadProgress]);

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
          masterTweet,
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
    closePopUp && closePopUp();
  };

  const handleTweetFiles = async (e: any) => {
    try {
      if (tweetFiles.length >= 4) {
        return enqueueSnackbar("You can only upload a maximum of 4 files", {
          variant: "error",
        });
      }
      const file = getUniqueFileName(e.target.files[0], userData?.id);
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadFile(
        file,
        signedUrl,
        enqueueSnackbar,
        setUploadProgress
      );
      const imageUrl = imageData?.config?.url?.split("?")[0];
      imageUrl && setTweetFiles([imageUrl, ...tweetFiles]);
    } catch (error) {
      console.log(error);
    } finally {
      // reset value so the input event handler can trigger again
      e.target.value = null;
      setUploadProgress(0);
    }
  };

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
            avatar={userData?.avatar}
            handle={userData?.handle}
            isNFT={userData?.data?.avatarMint}
          />
          <TextField
            multiline
            maxRows={4}
            value={tweet.value}
            onChange={tweet.onChange}
            placeholder={"It's happening..."}
            fullWidth={true}
            variant="standard"
            sx={{
              color: theme.palette.text.primary,
              padding: "1em 1em 1em 0",
              "& .MuiInput-root:before": {
                border: 0,
              },
              "& .MuiInputBase-inputMultiline": {
                overflow: "scroll",
              },
              "&:before": {
                borderColor: theme.tertiaryColor2,
              },
              "&:hover:not(.Mui-disabled):before": {
                borderColor: theme.tertiaryColor2,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmojiPicker
                    emojiHandler={(pickedEmoji: any) =>
                      tweet.setValue(tweet.value + pickedEmoji.native)
                    }
                  />
                </InputAdornment>
              ),
            }}
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
            <IconButton aria-label="upload image" component="label">
              <UploadFileIcon />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleTweetFiles}
              />
            </IconButton>
          </>
        )}

        {!tweetFiles.length && !gif && <NFTPicker setNftData={setNftData} />}
      </IconsGrid>
      <Grid item xs={6} pr={1}>
        <Box display={"flex"} sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            loading={loading}
            onClick={handleNewTweet}
            sx={{ borderRadius: "20px" }}
          >
            Post
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

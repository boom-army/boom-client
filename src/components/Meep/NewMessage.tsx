import ClearIcon from "@mui/icons-material/Clear";
import { AttributionLink } from "../Giphy/AttributionLink";
import { Box } from "@mui/system";
import {
  ChannelFeedDocument,
  FeedDocument,
  useNewTweetMutation,
} from "../../generated/graphql";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { ImageBox } from "../ImageBox";
import { NFTPicker } from "../NFT/NFTPicker";
import { NFTTweet } from "../NFT/NFTTweet";
import { RecoilState, useRecoilValue } from "recoil";
import { SIGN_FILE } from "../../queries/files";
import { SearchModal } from "../Giphy/SearchModal";
import {
  Stack,
  Avatar,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TWEET } from "../../queries/tweet";
import { USER } from "../../queries/client";
import { UploadFileIcon } from "../Icons";
import { VideoContainer } from "../Giphy/VideoContainer";
import { displayError, uploadFile } from "../../utils";
import { styled } from "@mui/material/styles";
import { useInput } from "../../hooks/useInput";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useSnackbar } from "notistack";
import { client } from "../../apollo/client";
import { ThemeContext } from "../../contexts/theme";
import { useContext, useState } from "react";

interface Props {
  feed?: any;
  channel?: string | undefined;
  parentTweetState: RecoilState<string>;
}

export const NewMessage: React.FC<Props> = ({
  feed,
  channel,
  parentTweetState,
}) => {
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const [gif, setGif]: any = useState(null);
  const [nftData, setNftData] = useState(null);
  const [tweetFiles, setTweetFiles]: any = useState([]);
  const tweet = useInput("");

  const parentTweet = useRecoilValue(parentTweetState);
  console.log("---------", parentTweet);

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
  const channelData = client.readFragment({
    id: `Channel:${channel}`,
    fragment: gql`
      fragment TweetChannel on Channel {
        id
        name
        family
      }
    `,
  });
  console.log(channelData);

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
      enqueueSnackbar("Your tweet has been posted", { variant: "success" });
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

  const { data } = useQuery(USER);

  const mapTweetFiles = (url: string, index: number) => ({
    url,
    id: `preview-${index}`,
  });

  return (
    <>
      <Grid container p={2} sx={{ borderTop: `2px solid ${theme.tertiaryColor}`}}>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={data?.me?.avatar}
              sx={{
                width: 30,
                height: 30,
                border: `1px solid ${theme.tertiaryColor}`,
              }}
            />
            <TextField
              id="outlined-basic"
              value={tweet.value}
              onChange={tweet.onChange}
              placeholder={`Meep in # ${channelData?.family} ${channelData?.name}`}
              fullWidth={true}
              InputProps={{
                style: { color: theme.secondaryColor },
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

        <Grid item xs={6} pl={1}>
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

          {!tweetFiles.length && !nftData && <SearchModal setGif={setGif} />}

          {!gif && !nftData && (
            <>
              <label htmlFor="file-input">
                <UploadFileIcon />
              </label>
              <Box display={"none"}>
                <input
                  id="file-input"
                  accept="image/*"
                  type="file"
                  onChange={handleTweetFiles}
                />
              </Box>
            </>
          )}

          {!tweetFiles.length && !gif && <NFTPicker setNftData={setNftData} />}
        </Grid>
        <Grid item xs={6} pr={1}>
          <Box display={"flex"} sx={{ justifyContent: "flex-end" }}>
            <IconButton disabled={loading}>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

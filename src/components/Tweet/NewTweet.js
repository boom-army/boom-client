import { useState } from "react";
import Button from "../../styles/Button";
import { Stack, Avatar, TextareaAutosize } from "@mui/material";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { AttributionLink } from "../Giphy/AttributionLink";
import { Box } from "@mui/system";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { FEED } from "../../queries/others";
import { ImageBox } from "../ImageBox";
import { NEW_TWEET, TWEET } from "../../queries/tweet";
import { NFTPicker } from "../NFT/NFTPicker";
import { NFTTweet } from "../NFT/NFTTweet";
import { SIGN_FILE } from "../../queries/files";
import { SearchModal } from "../Giphy/SearchModal";
import { USER } from "../../queries/client";
import { UploadFileIcon } from "../Icons";
import { VideoContainer } from "../Giphy/VideoContainer";
import { displayError, uploadImage } from "../../utils";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 7px solid ${(props) => props.theme.tertiaryColor};

  form {
    width: 100%;
  }

  textarea {
    width: 100%;
    background: inherit;
    border: none;
    font-size: 1.23rem;
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 0.75rem;
    padding: 0.75rem 0;
  }

  .new-tweet {
    display: flex;
    flex-direction: column;
  }

  .new-tweet-action {
    display: flex;
    align-items: center;
  }

  .svg-input .emoji-pick svg,
  .svg-input .tweet-gif svg,
  .svg-input .file-upload-icon svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.accentColor};
    margin-right: 2rem;
    cursor: pointer;
  }
  .avatar {
    margin: 0 1rem;
  }
`;

export const NewTweet = ({ feed, parentTweet }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gif, setGif] = useState(null);
  const [nftData, setNftData] = useState(null);
  const [tweetFiles, setTweetFiles] = useState([]);
  const tweet = useInput("");

  const [newTweetMutation, { loading }] = useMutation(NEW_TWEET, {
    refetchQueries: [
      {
        query: FEED,
        variables: {
          offset: 0,
          limit: feed?.length + 1, // current tweet length + 1 for the new tweet
        },
      },
      {
        query: TWEET,
        variables: { id: parentTweet },
      },
    ],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  const createGifInput = (gif) => ({
    title: gif.title,
    fixedHeightUrl: gif.images.fixed_height.mp4,
    originalUrl: gif.images.original.mp4,
  });

  const handleNewTweet = async (e) => {
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

  const handleTweetFiles = async (e) => {
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
      const imageData = await uploadImage(file, signedUrl, enqueueSnackbar);
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

  const mapTweetFiles = (url, index) => ({
    url,
    id: `preview-${index}`,
  });

  return (
    <Wrapper>
      <Avatar className="avatar" src={data?.me?.avatar} />
      <form onSubmit={handleNewTweet}>
        <div className="new-tweet">
          <TextareaAutosize
            placeholder="What's happening?"
            type="text"
            value={tweet.value}
            onChange={tweet.onChange}
          />

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

          <div className="new-tweet-action">
            <div className="svg-input">
              <EmojiPicker
                emojiHandler={(pickedEmoji) =>
                  tweet.setValue(tweet.value + pickedEmoji.native)
                }
              />

              {!tweetFiles.length && !nftData && (
                <SearchModal setGif={setGif} />
              )}

              {!gif && !nftData && (
                <>
                  <label htmlFor="file-input">
                    <span className="file-upload-icon">
                      <UploadFileIcon />
                    </span>
                  </label>
                  <input
                    id="file-input"
                    accept="image/*"
                    type="file"
                    onChange={handleTweetFiles}
                  />
                </>
              )}

              {!tweetFiles.length && !gif && (
                <NFTPicker setNftData={setNftData} />
              )}
            </div>
            <Button sm disabled={loading}>
              Post
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

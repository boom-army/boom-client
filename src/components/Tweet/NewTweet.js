import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "../../styles/Button";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { FEED } from "../../queries/others";
import { NEW_TWEET } from "../../queries/tweet";
import { SIGN_FILE } from "../../queries/files";
import { USER } from "../../queries/client";
import { UploadFileIcon } from "../Icons";
import { displayError } from "../../utils";
import { uploadImage } from "../../utils";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { ImageBox } from "../ImageBox";
import { EmojiPicker } from "../Pickers/EmojiPicker";
import { NFTPicker } from "../Pickers/NFTPicker";
import { SearchModal } from "../Giphy/SearchModal";
import { Box } from '@mui/system';
import { VideoContainer } from '../Giphy/VideoContainer';
import Stack from '@mui/material/Stack';
import { AttributionLink } from '../Giphy/AttributionLink';

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 7px solid ${(props) => props.theme.tertiaryColor};

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

export const NewTweet = ({ feed }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tweetFiles, setTweetFiles] = useState([]);
  const [gif, setGif] = useState(null);
  const tweet = useInput("");

  const [newTweetMutation, { loading }] = useMutation(NEW_TWEET, {
    refetchQueries: [
      {
        query: FEED,
        variables: {
          offset: 0,
          limit: feed?.length + 1, // current tweet length + 1 for the new tweet
        }
      }
    ],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  const createGifInput = gif => ({
    title: gif.title,
    fixedHeightUrl: gif.images.fixed_height.mp4,
    originalUrl: gif.images.original.mp4,
  });

  const handleNewTweet = async (e) => {
    e.preventDefault();

    // a tweet can have no text body if it has a gif
    if (!tweet.value && !gif)
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
          gif: createGifInput(gif),
          files: tweetFiles,
        },
      });

      enqueueSnackbar("Your tweet has been posted", { variant: "success" });
    } catch (err) {
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
      const imageUrl = imageData.config.url.split("?")[0];
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
      <Avatar
        className="avatar"
        src={data?.me?.avatar}
      />
      <form onSubmit={handleNewTweet}>
        <div className="new-tweet">
          <TextareaAutosize
            cols="48"
            placeholder="What's happening?"
            type="text"
            value={tweet.value}
            onChange={tweet.onChange}
          />

          {gif && (
            <Box sx={{ marginBottom: 2 }}>
              <Stack direction="column">
                <VideoContainer gif={createGifInput(gif)} onClose={() => setGif(null)} />
                <AttributionLink src={gif.url} />
              </Stack>
            </Box>
          )}

          {!!tweetFiles.length && (
            <ImageBox files={tweetFiles.map(mapTweetFiles)} />
          )}

          <div className="new-tweet-action">
            <div className="svg-input">
              <EmojiPicker emojiHandler={pickedEmoji => tweet.setValue(tweet.value + pickedEmoji.native)} />

              {!tweetFiles.length && <SearchModal setGif={setGif} />}

              {!gif && (
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
            </div>
            <Button sm disabled={loading}>
              Post
            </Button>
          </div>
        </div>
      </form>
    </Wrapper >
  );
};

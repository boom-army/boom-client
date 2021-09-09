import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "../../styles/Button";
import PersonIcon from "@material-ui/icons/Person";
import TextareaAutosize from "react-textarea-autosize";
import TweetFile from "../../styles/TweetFile";
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
    margin-bottom: 1.4rem;
  }

  .new-tweet {
    display: flex;
    flex-direction: column;
  }

  .new-tweet-action {
    display: flex;
    align-items: center;
  }

  .svg-input svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.accentColor};
    margin-right: 2rem;
    cursor: pointer;
  }
  .avatar {
    margin: 0 1rem;
  }

  button {
    position: relative;
  }
`;

export const NewTweet = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [tweetFiles, setTweetFiles] = useState([]);
  const tweet = useInput("");

  const [newTweetMutation, { loading }] = useMutation(NEW_TWEET, {
    refetchQueries: [{ query: FEED }],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  const handleNewTweet = async (e) => {
    e.preventDefault();

    if (!tweet.value)
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
          files: tweetFiles,
        },
      });

      enqueueSnackbar("Your tweet has been posted", { variant: "success" });
    } catch (err) {
      return displayError(err);
    }

    tweet.setValue("");
    setTweetFiles([]);
  };

  const handleTweetFiles = async (e) => {
    try {
      const file = e.target.files[0];
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageUrl = await uploadImage(file, signedUrl);
      console.log(imageUrl);
      setTweetFiles([...tweetFiles, imageUrl]);
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery(USER);

  return (
    <Wrapper>
      <Avatar
        src={data?.me?.avatar ? data?.me?.avatar : <PersonIcon />}
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

          {tweetFiles[0] && (
            <TweetFile newtweet src={tweetFiles[0]} alt="preview" />
          )}

          <div className="new-tweet-action">
            <div className="svg-input">
              <label htmlFor="file-input">
                <UploadFileIcon />
              </label>
              <input
                id="file-input"
                accept="image/*"
                type="file"
                onChange={handleTweetFiles}
              />
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

import "emoji-mart/css/emoji-mart.css";
import styled from "styled-components";
import { EmojiPicker } from "../Emojis/EmojiPicker";
import { Loader } from "../Loader";
import { SmilePlusIcon } from "../Icons";
import { useReaction } from "../../hooks/useReaction";

const ReactionWrapper = styled.div`
  display: flex;
  margin-right: 4em;
`;

export const EmojiTweet = ({ tweetId, userPubKey }) => {
  const { handleReaction, loading } = useReaction({ tweetId, userPubKey });

  if (loading) return <Loader />;

  return (
    <ReactionWrapper>

      <EmojiPicker
        emojiHandler={({ id: emojiId, skin }) =>
          handleReaction({ emojiId, skin })
        }
        customIcon={<SmilePlusIcon />}
        dismissOnClick={true}
      />
    </ReactionWrapper>
  );
};

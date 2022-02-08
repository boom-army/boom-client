import { MENTIONS } from "../queries/others";
import { TOGGLE_REACTION, TWEET } from "../queries/tweet";
import { displayError } from "../utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useState, useCallback } from "react";

export const useReaction = ({ tweetId, userPubKey }) => {
  const [emoji, setEmoji] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const [toggleReactionMutation, { loading }] = useMutation(TOGGLE_REACTION, {
    variables: { id: tweetId, emojiId: emoji?.emojiId, skin: emoji?.skin },
    refetchQueries: [
      { query: MENTIONS },
      { query: TWEET, variables: { id: tweetId } }
    ],
  });

  const handleReaction = useCallback(
    async ({ emojiId, skin }) => {
      try {
        setEmoji({ emojiId, skin });
        await toggleReactionMutation();
        enqueueSnackbar(`Emoji added`, {
          variant: "success",
        });
      } catch (err) {
        console.log(err);
        return displayError(err, enqueueSnackbar);
      }
    },
    [toggleReactionMutation, enqueueSnackbar]
  );

  return {
    handleReaction,
    loading,
  }
};

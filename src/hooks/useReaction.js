import { MENTIONS } from "../queries/others";
import { TOGGLE_REACTION, TWEET } from "../queries/tweet";
import { displayError } from "../utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

export const useReaction = ({ tweetId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [toggleReactionMutation, { loading }] = useMutation(TOGGLE_REACTION, {
    refetchQueries: [
      { query: MENTIONS },
      { query: TWEET, variables: { id: tweetId } }
    ],
  });

  const handleReaction = useCallback(
    async ({ emojiId, skin }) => {
      try {
        await toggleReactionMutation({ variables: { id: tweetId, emojiId, skin } });
        enqueueSnackbar(`Emoji updated`, { variant: "success" });
      } catch (err) {
        console.log(err);
        return displayError(err, enqueueSnackbar);
      }
    },
    [toggleReactionMutation, enqueueSnackbar, tweetId]
  );

  return {
    handleReaction,
    loading,
  };
};

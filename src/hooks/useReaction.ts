import { TOGGLE_REACTION, TWEET } from "../queries/tweet";
import { displayError } from "../utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

interface Props {
  tweetId: string;
}

export const useReaction = ({ tweetId }:Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [toggleReactionMutation, { loading }] = useMutation(TOGGLE_REACTION, {
    refetchQueries: [{ query: TWEET, variables: { id: tweetId } }],
  });

  const handleReaction = useCallback(
    async ({ emojiId, skin }) => {
      try {
        await toggleReactionMutation({
          variables: { id: tweetId, emojiId, skin },
        });
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

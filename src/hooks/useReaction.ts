import { displayError } from "../utils";
import { useSnackbar } from "../contexts/snackbar";
import { useCallback } from "react";
import { TweetDocument, useToggleReactionMutation } from "../generated/graphql";

interface Props {
  tweetId: string;
}

export const useReaction = ({ tweetId }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [toggleReactionMutation, { loading }] = useToggleReactionMutation({
    refetchQueries: [{ query: TweetDocument, variables: { id: tweetId } }],
  });

  const handleReaction = useCallback(
    async ({ emojiId }: { emojiId: string }) => {
      try {
        await toggleReactionMutation({
          variables: { id: tweetId, emojiId, skin: null },
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

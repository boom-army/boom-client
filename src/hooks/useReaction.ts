import { displayError } from "../utils";
import { useSnackbar } from "../contexts/snackbar";
import { useCallback } from "react";
import {
  FeedDocument,
  GetUserChannelsDocument,
  HeroFeedDocument,
  TweetDocument,
  useToggleReactionMutation,
} from "../generated/graphql";

interface Props {
  tweetId: string;
  parentTweetId?: string;
}

export const useReaction = ({ tweetId, parentTweetId }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [toggleReactionMutation, { loading }] = useToggleReactionMutation({
    refetchQueries: [
      FeedDocument,
      HeroFeedDocument,
      GetUserChannelsDocument,
      { query: TweetDocument, variables: { id: parentTweetId ?? tweetId } },
    ],
  });

  const handleReaction = useCallback(
    async ({ emojiId }: { emojiId: string }) => {
      try {
        await toggleReactionMutation({
          variables: { id: tweetId, emojiId, skin: null },
        });
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

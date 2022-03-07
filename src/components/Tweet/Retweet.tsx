import React, { useState } from "react";
import { RetweetIcon, RtFillIcon } from "../Icons";
import { TOGGLE_RETWEET } from "../../queries/tweet";
import { displayError } from "../../utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

interface RetweetProps {
  id: string;
  isRetweet: boolean;
  retweetsCount: number;
}

export const Retweet = ({ id, isRetweet, retweetsCount }: RetweetProps) => {
  const [retweet, setRetweet] = useState(isRetweet);
  const [retweetsCountState, setRetweetsCount] = useState(retweetsCount);
  const [toggleRetweetMutation, { loading }] = useMutation(TOGGLE_RETWEET, {
    variables: { id },
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleRetweet = async () => {
    try {
      await toggleRetweetMutation();
      setRetweet(!retweet);
      if (retweet) {
        setRetweetsCount(retweetsCountState - 1);
        enqueueSnackbar("Retweet removed", { variant: "success" });
      } else {
        setRetweetsCount(retweetsCountState + 1);
        enqueueSnackbar("Retweet done", { variant: "success" });
      }
    } catch (err) {
      return displayError(err, enqueueSnackbar);
    }
  };

  return (
    <span>
      {retweet ? (
        <RtFillIcon loading={loading} color="#17BF63" onClick={handleRetweet} />
      ) : (
        <RetweetIcon loading={loading} onClick={handleRetweet} />
      )}
      {retweetsCountState ? retweetsCountState : null}
    </span>
  );
};

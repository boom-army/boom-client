import { useState, useContext } from "react";
import { Box } from "@mui/system";
import { RetweetIcon, RtFillIcon } from "../Icons";
import { useToggleRetweetMutation } from "../../generated/graphql";

import { Typography, useTheme } from "@mui/material";
import { displayError } from "../../utils";
import { useSnackbar } from "../../contexts/snackbar";

interface RetweetProps {
  id: string;
  isRetweet: boolean;
  retweetsCount: number;
}

export const Retweet = ({ id, isRetweet, retweetsCount }: RetweetProps) => {
  const theme = useTheme();
  const [retweet, setRetweet] = useState(isRetweet);
  const [retweetsCountState, setRetweetsCount] = useState(retweetsCount);
  const [toggleRetweetMutation, { loading }] = useToggleRetweetMutation({
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
    <Box display="flex" sx={{ alignItems: "center" }}>
      {retweet ? (
        <RtFillIcon loading={loading} color="#17BF63" onClick={handleRetweet} />
      ) : (
        <RetweetIcon loading={loading} onClick={handleRetweet} />
      )}
      <Typography ml={0.5} color="secondary">
        {retweetsCountState ? retweetsCountState : null}
      </Typography>
    </Box>
  );
};

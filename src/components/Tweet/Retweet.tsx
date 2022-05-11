import { useState, useContext } from "react";
import { Box } from "@mui/system";
import { RetweetIcon, RtFillIcon } from "../Icons";
import { TOGGLE_RETWEET } from "../../queries/tweet";
import { ThemeContext } from "../../contexts/theme";
import { Typography } from "@mui/material";
import { displayError } from "../../utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "../../contexts/snackbar";

interface RetweetProps {
  id: string;
  isRetweet: boolean;
  retweetsCount: number;
}

export const Retweet = ({ id, isRetweet, retweetsCount }: RetweetProps) => {
  const { theme } = useContext(ThemeContext);
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
    <Box display="flex" sx={{ alignItems: "center"}}>
      {retweet ? (
        <RtFillIcon loading={loading} color="#17BF63" onClick={handleRetweet} />
      ) : (
        <RetweetIcon loading={loading} onClick={handleRetweet} />
      )}
      <Typography ml={0.5} sx={{ color: theme.secondaryColor }}>{retweetsCountState ? retweetsCountState : null}</Typography>
    </Box>
  );
};

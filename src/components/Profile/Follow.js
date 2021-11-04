import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Box, Link } from "@mui/material";
import { FEED } from "../../queries/others";
import { USERS } from "../../queries/follow";
import { FOLLOW, UNFOLLOW } from "../../queries/follow";
import { displayError } from "../../utils";
import { useMutation } from '@apollo/client';
import { useSnackbar } from "notistack";

export const Follow = ({ isFollowing, id, sm = false, relative = false }) => {
  const [followState, setFollowState] = useState(isFollowing);

  const [followMutation] = useMutation(FOLLOW, {
    variables: { id },
    refetchQueries: [{ query: FEED }, { query: USERS }],
  });

  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: { id },
    refetchQueries: [{ query: FEED }, { query: USERS }],
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleFollow = async () => {
    if (followState) {
      setFollowState(false);
      try {
        await unfollowMutation();
      } catch (err) {
        displayError(err, enqueueSnackbar);
      }
    } else {
      setFollowState(true);
      try {
        await followMutation();
      } catch (err) {
        displayError(err, enqueueSnackbar);
      }
    }
  };

  return (
    <Box>
      <Link onClick={handleFollow} sx={{ cursor: "pointer"}}>
        {followState ? <PersonRemoveIcon /> : <PersonAddIcon />}
      </Link>
    </Box>
  );
};

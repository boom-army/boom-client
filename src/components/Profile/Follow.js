import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FEED, USERS } from "../../queries/others";
import { FOLLOW, UNFOLLOW } from "../../queries/follow";
import { Box, Link } from "@mui/material";
import { displayError } from "../../utils";
import { useMutation } from '@apollo/client';

const Follow = ({ isFollowing, id, sm = false, relative = false }) => {
  const [followState, setFollowState] = useState(isFollowing);

  const [followMutation] = useMutation(FOLLOW, {
    variables: { id },
    refetchQueries: [{ query: FEED }, { query: USERS }],
  });

  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: { id },
    refetchQueries: [{ query: FEED }, { query: USERS }],
  });

  const handleFollow = async () => {
    if (followState) {
      setFollowState(false);
      try {
        await unfollowMutation();
      } catch (err) {
        displayError(err);
      }
    } else {
      setFollowState(true);
      try {
        await followMutation();
      } catch (err) {
        displayError(err);
      }
    }
  };

  return (
    <Box>
      <Link onClick={handleFollow} >
        {followState ? <PersonRemoveIcon /> : <PersonAddIcon />}
      </Link>
    </Box>
  );
};

export default Follow;

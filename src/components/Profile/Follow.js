import React, { useState } from "react";
import Button from "../../styles/Button";
import { FEED, USERS } from "../../queries/others";
import { FOLLOW, UNFOLLOW } from "../../queries/follow";
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
    <Button
      className="action-btn"
      onClick={handleFollow}
      variant="outlined"
      color="primary"
    >
      {followState ? "Following" : "Follow"}
    </Button>
  );
};

export default Follow;

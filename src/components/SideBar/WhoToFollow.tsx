import { Box, Typography, useTheme } from "@mui/material";
import { Loader } from "../Loader";

import { USER_FOLLOW } from "../../queries/follow";
import { User as UserProps } from "../../generated/graphql";
import { useQuery } from "@apollo/client";
import { User } from "../User";

export const WhoToFollow = () => {
  const theme = useTheme();

  const { loading, error, data } = useQuery(USER_FOLLOW);

  if (loading) return <Loader />;
  if (error) return null;

  return (
    <>
      <Box px={1.5} py={1}>
        <Typography color="secondary" variant="body2">
          Who to follow
        </Typography>
      </Box>
      <Box>
        {data.userFollow.map((user: UserProps) => (
          <User key={user.id} user={user} />
        ))}
      </Box>
    </>
  );
};

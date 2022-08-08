import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Loader } from "./Loader";
import { useTheme } from '@mui/material/styles';
import { USER_FOLLOW } from "../queries/follow";
import { User as UserProps } from "../generated/graphql";
import { useQuery } from "@apollo/client";
import { User } from "./User";

export const WhoToFollow = () => {
  const theme = useTheme();

  const { loading, error, data } = useQuery(USER_FOLLOW);

  if (loading) return <Loader />;
  if (error) return null;

  return (
    <>
      <Box>
        <Typography sx={{ color: theme.palette.secondary.main }}>
          Who to follow
        </Typography>
      </Box>
      <Box mt={4}>
        {data.userFollow.map((user: UserProps) => (
          <User key={user.id} user={user} />
        ))}
      </Box>
    </>
  );
};

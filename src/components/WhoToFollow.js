import React from "react";
import Avatar from "@mui/material/Avatar";
import Follow from "./Profile/Follow";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { USERS } from "../queries/others";
import { useQuery } from "@apollo/client";
import { Button, Grid, Stack, Typography } from "@mui/material";

export const User = ({ user }) => (
  <Grid container spacing={2}>
    <Grid item xs={8}>
      <Link to={`/${user && user.handle}`}>
      <Stack direction="row">
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={user && user.avatar ? user.avatar : <PersonIcon />}
        />
        <Typography variant="body2">{user && user.fullname}</Typography>
        </Stack>
      </Link>
      <Typography variant="body2">@{user && user.handle}</Typography>
    </Grid>
    <Grid item xs={4}>
      {/* {user && !user.isSelf ? (
      <Follow sm id={user && user.id} isFollowing={user && user.isFollowing} />
    ) : ( */}
      <Button
        variant="contained"
        component={Link}
        to="/settings/profile"
        size="small"
      >
        Edit
      </Button>
      {/* )} */}
    </Grid>
  </Grid>
);

export const WhoToFollow = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={2}
    >
      {data.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </Stack>
  );
};

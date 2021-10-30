import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import Follow from "./Profile/Follow";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { USERS } from "../queries/others";
import { styled } from "@mui/material/styles";
import { useQuery } from "@apollo/client";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: '#313d48',
}));

export const User = ({ user }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid item xs={12}>
      <Demo>
        <List dense={false}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                {user && !user.isSelf ? (
                  <Follow
                    sm
                    id={user && user.id}
                    isFollowing={user && user.isFollowing}
                  />
                ) : (
                  <Link to="/settings/profile">
                    <AccountBoxIcon />
                  </Link>
                )}
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={user?.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={user && user.consumerName}
              secondary={`@${user && user.handle}`}
            />
          </ListItem>
        </List>
      </Demo>
    </Grid>
  </Box>
);

export const WhoToFollow = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <Loader />;
  if (error) return null;

  return data.users.map((user) => <User key={user.id} user={user} />);
};

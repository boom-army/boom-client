import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import { Follow } from "./Profile/Follow";
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
import { USER_FOLLOW } from "../queries/follow";
import { styled } from "@mui/material/styles";
import { useQuery } from "@apollo/client";

const Demo = styled("div")(props => ({
    background:  props.theme.background,
    'p':{
      color:props.theme.secondaryColor
    },
    font : props.theme.font
}));

export const User = ({ user }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid item xs={12}>
      <Demo>
      <p>Who To Follow</p>
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
  const { loading, error, data } = useQuery(USER_FOLLOW);

  if (loading) return <Loader />;
  if (error) return null;

  return data.userFollow.map((user) => <User key={user.id} user={user} />);
};

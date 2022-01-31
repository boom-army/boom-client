import { useContext } from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Follow } from "../Profile/Follow";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/theme";
import { User as UserProps } from "../../generated/graphql";

type Props = {
  user: UserProps;
};

export const User = ({ user }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Grid container spacing={2} sx={{ paddingBottom: "3em" }}>
        <Grid container xs={10}>
          <Grid item xs={2}>
            <Box>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={user?.avatar as string}
              />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box mr={2}>
              <Typography noWrap>{user && user.consumerName}</Typography>
              <Typography noWrap sx={{ color: theme.secondaryColor }}>{`@${
                user && user.handle
              }`}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container xs={2}>
          <Box>
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

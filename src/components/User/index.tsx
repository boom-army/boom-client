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
      <Grid container sx={{ paddingBottom: "3em" }}>
        <Grid item xs={10}>
          <Box sx={{ display: "flex"}}>
          <Box>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={user?.avatar as string}
            />
          </Box>
          <Box ml={2}>
            <Typography noWrap sx={{ width: "10em" }}>{user && user.consumerName}</Typography>
            <Typography noWrap sx={{ color: theme.secondaryColor, width: "10em" }}>{`@${
              user && user.handle
            }`}</Typography>
          </Box>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ justifyContent: "flex-end" }}>
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

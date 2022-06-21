import { useContext } from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Typography,
} from "@mui/material";
import { Follow } from "../Profile/Follow";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/theme";
import { User as UserProps } from "../../generated/graphql";
import { UserAvatar } from "../UserAvatar";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  user: UserProps;
};

export const User = ({ user }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Card>
      <Box sx={{ display: "flex" }}>
        <CardActionArea
          component={RouterLink}
          to={`/${user.handle}`}
          sx={{ padding: "0.7em" }}
        >
          <Box sx={{ display: "flex", overflow: "hidden" }}>
            <Box>
              <UserAvatar
                sx={{
                  width: 30,
                  height: 30,
                }}
                avatar={user?.avatar}
                isNFT={user?.data?.avatarIsNFT ?? false}
              />
            </Box>
            <Box ml={2}>
              <Typography noWrap sx={{ width: "10em" }}>
                {user && user.consumerName}
              </Typography>
              <Typography
                noWrap
                sx={{ color: theme.secondaryColor, width: "10em" }}
              >{`@${user && user.handle}`}</Typography>
            </Box>
          </Box>
        </CardActionArea>
        <Box sx={{ minWidth: "40px" }}>
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
      </Box>
    </Card>
  );
};

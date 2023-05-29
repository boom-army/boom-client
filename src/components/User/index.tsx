import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Follow } from "../Profile/Follow";
import { Link } from "react-router-dom";

import { User as UserProps } from "../../generated/graphql";
import { UserAvatar } from "../UserAvatar";
import { Link as RouterLink } from "react-router-dom";
import { RoutePath } from "../../constants";

type Props = {
  user: UserProps;
};

export const User = ({ user }: Props) => {
  const theme = useTheme();
  return (
    <Card sx={{ backgroundImage: "none", background: theme.background }}>
      <Box sx={{ display: "flex" }}>
        <CardActionArea
          component={RouterLink}
          to={`/${RoutePath.HANDLE_HASH}/${user.handle}`}
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
                handle={user?.handle}
                isNFT={user?.data?.avatarMint}
              />
            </Box>
            <Box ml={2}>
              <Typography noWrap sx={{ width: "10em" }}>
                {user && user.consumerName}
              </Typography>
              <Typography noWrap color="secondary" sx={{ width: "10em" }}>{`@${
                user && user.handle
              }`}</Typography>
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
              <Link to={`/${RoutePath.PROFILE_SETTINGS}`}>
                <AccountBoxIcon />
              </Link>
            )}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

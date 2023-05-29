import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useContext } from "react";
import { Badge, Box, Grid, IconButton, styled } from "@mui/material";
import { WalletMultiButton } from "../WalletMUIConnect";
import { useNewMentions, useSidebarState } from "../../hooks";
import { UserAvatar } from "../UserAvatar";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { RoutePath } from "../../constants";

export const CurrentUser: React.FC = () => {
  const { sidebar, toggleRightSidebar } = useSidebarState();
  const { newMentions } = useNewMentions();
  const { user } = useContext(UserContext);

  const NotificationPulse = styled(NotificationsActiveIcon)(({ theme }) => ({
    padding: "0.15rem",
    animation: "pulse 5s infinite",
    borderRadius: "50%",
    border: `1px solid ${theme.palette.text.primary}`,
    borderColor: theme.palette.text.primary,
    "@keyframes pulse": {
      "0%": {
        opacity: 1,
      },
      "50%": {
        opacity: 0.5,
      },
      "100%": {
        opacity: 1,
      },
    },
  }));

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box mr={1} display="flex" alignItems="center">
          {user && (
            <Box mr={2}>
              <Link to={`/${RoutePath.HANDLE_HASH}/${user.handle}`}>
                <UserAvatar
                  avatar={user?.avatar as string}
                  handle={user?.handle}
                  isNFT={user?.data?.avatarMint}
                  sx={{
                    height: "1.5rem",
                    width: "1.5rem",
                    ":hover": {
                      opacity: 0.7,
                    },
                  }}
                />
              </Link>
            </Box>
          )}
          <WalletMultiButton />
          {user && (
            <>
              {sidebar.rightNotificationsFull ? (
                <IconButton
                  aria-label="notifications-open"
                  onClick={() =>
                    toggleRightSidebar(!sidebar.rightNotificationsFull)
                  }
                >
                  {newMentions?.length ? (
                    <Badge badgeContent={newMentions?.length} color="primary">
                      <NotificationPulse />
                    </Badge>
                  ) : (
                    <NotificationPulse />
                  )}
                </IconButton>
              ) : (
                <IconButton
                  aria-label="notifications"
                  onClick={() =>
                    toggleRightSidebar(!sidebar.rightNotificationsFull)
                  }
                >
                  {newMentions?.length ? (
                    <Badge badgeContent={newMentions?.length} color="primary">
                      <NotificationsIcon />
                    </Badge>
                  ) : (
                    <NotificationsIcon />
                  )}
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};

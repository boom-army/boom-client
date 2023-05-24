import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { Badge, Box, Grid, IconButton, styled } from "@mui/material";
import { WalletMultiButton } from "../WalletMUIConnect";
import { useNewMentions, useSidebarState } from "../../hooks";

export const CurrentUser: React.FC = () => {
  const { sidebar, toggleRightSidebar } = useSidebarState();
  const { newMentions } = useNewMentions();

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
          <WalletMultiButton />
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
        </Box>
      </Grid>
    </>
  );
};

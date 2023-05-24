import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { Badge, Box, Grid, IconButton, useTheme } from "@mui/material";
import { WalletMultiButton } from "../WalletMUIConnect";

export const CurrentUser: React.FC<{ notifications: number }> = ({
  notifications,
}) => {
  const theme = useTheme();
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
          <IconButton aria-label="notifications">
            <Badge badgeContent={notifications} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="notifications-open">
            <NotificationsActiveIcon
              sx={{
                border: `1px solid ${theme.palette.text.primary}`,
                borderRadius: "50%",
                p: 0.2,
              }}
            />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

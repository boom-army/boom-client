import { Badge, Box, Grid, IconButton } from "@mui/material";
import { WalletMultiButton } from "../WalletMUIConnect";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const CurrentUser = () => {
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
            <Badge badgeContent={1} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

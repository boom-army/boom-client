import { Box, Grid, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggleDrawer } from "../../hooks";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";

export const CurrentUser = () => {
  const toggleDrawer = useToggleDrawer();
  
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box mr={1} display="flex" alignItems="center" >
        <WalletMultiButton />
          <IconButton
            color="primary"
            onClick={toggleDrawer(true)}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

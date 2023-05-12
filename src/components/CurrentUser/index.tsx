import { Box, Grid, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggleDrawer } from "../../hooks";

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
          <IconButton
            color="primary"
            onClick={toggleDrawer(true)}
            sx={{ marginRight: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Theme } from "../../contexts/theme";
import MenuIcon from "@mui/icons-material/Menu";

export const CurrentUser = () => {
  const headerImg =
    localStorage.getItem(Theme.StorageTag) === Theme.Light
      ? "/assets/boom-logo-dark.png"
      : "/assets/boom-logo-light.png";
  
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
            component={Link}
            to="/"
            sx={{ marginRight: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="body2"
            component="h2"
            color="primary"
            sx={{
              display: "inline-flex",
            }}
          >
            <img src={headerImg} alt="Boom" height={20} />
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

import { ThemeContext } from "../../contexts/theme";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";

export const CurrentUser = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box mr={1}>
          <Link to="/">
            <Typography
              variant="body2"
              component="h2"
              color={"primary"}
              mt={1}
              sx={{
                display: "inline-flex",
                "&:hover": { backgroundColor: theme.accentColor },
              }}
            >
              <img src={"/assets/boom-logo.png"} alt="Boom" width={"30"} />{" "}
              <Box ml={1} pt={0.5} pr={1}>
                βeta
              </Box>
            </Typography>
          </Link>
        </Box>
      </Grid>
    </>
  );
};


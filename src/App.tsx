import React, { useContext } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { AppRoutes } from "./routes";
import { ThemeContext } from "./contexts/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
// import { USER_LOGGED_IN } from "./queries/client";
// import { useQuery } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import SimpleReactLightbox from "simple-react-lightbox";

export const App = () => {
  const { theme } = useContext(ThemeContext);

  // const {
  //   data: { isLoggedIn },
  // } = useQuery(USER_LOGGED_IN);

  return (
    <StyledThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <SnackbarProvider maxSnack={3}>
        <SimpleReactLightbox>
          <AppRoutes />
        </SimpleReactLightbox>
      </SnackbarProvider>
    </StyledThemeProvider>
  );
};

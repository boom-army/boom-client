import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes } from "./routes";
import { ThemeContext } from "./contexts/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        toastClassName="toast-style"
        autoClose={2000}
        closeButton={false}
        draggable={false}
      />
      <SnackbarProvider maxSnack={3}>
        <SimpleReactLightbox>
          <Routes />
        </SimpleReactLightbox>
      </SnackbarProvider>
    </StyledThemeProvider>
  );
};

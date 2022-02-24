import GlobalStyle from "./styles/GlobalStyle";
import SimpleReactLightbox from "simple-react-lightbox";
import { AppRoutes } from "./routes";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeContext } from "./contexts/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { UserContextProvider } from "./contexts/user";
import { useContext } from "react";

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <SnackbarProvider maxSnack={3}>
        <SimpleReactLightbox>
          <UserContextProvider>
            <AppRoutes />
          </UserContextProvider>
        </SimpleReactLightbox>
      </SnackbarProvider>
    </StyledThemeProvider>
  );
};

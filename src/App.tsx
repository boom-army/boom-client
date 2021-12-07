import { useContext } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { AppRoutes } from "./routes";
import { ThemeContext } from "./contexts/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import SimpleReactLightbox from "simple-react-lightbox";
import { UserContextProvider } from './contexts/user';

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

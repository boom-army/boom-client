import GlobalStyle from "./styles/GlobalStyle";
import OneSignal from "react-onesignal";
import SimpleReactLightbox from "simple-react-lightbox";
import { AppRoutes } from "./routes";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeContext } from "./contexts/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useOneSignalQuery } from "./generated/graphql";
import { UserContextProvider } from "./contexts/user";

export const App = () => {
  const { theme } = useContext(ThemeContext);
  const isLoggedIn = localStorage.getItem("user");

  const [oneSignalPlayer, setOneSignalPlayer] = useState("");

  const { refetch } = useOneSignalQuery({
    variables: { oneSignalId: oneSignalPlayer },
  });

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await OneSignal.init({
          appId: process.env.REACT_APP_ONESIGNAL_APP_ID as string,
        });
      }
      const userId = await OneSignal.getUserId();
      if (userId) {
        setOneSignalPlayer(userId as string);
      }
    })();
  }, [isLoggedIn]);

  OneSignal.on("subscriptionChange", async (isSubscribed: Boolean) => {
    const userId = await OneSignal.getUserId();
    if (isSubscribed) {
      setOneSignalPlayer(userId as string);
      refetch();
    }
  });

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

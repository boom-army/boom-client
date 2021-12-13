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
  const [appProfile, setAppProfile] = useState();

  const [oneSignalPlayer, setOneSignalPlayer] = useState<string>("");

  const { refetch, data } = useOneSignalQuery({
    variables: { oneSignalId: oneSignalPlayer },
  });

  useEffect(() => {
    (async () => {
      if (appProfile) {
        await OneSignal.init({
          appId: process.env.REACT_APP_ONESIGNAL_APP_ID as string,
        });
      }
      const userId = await OneSignal.getUserId();
      if (userId) {
        setOneSignalPlayer(userId as string);
      }
    })();
  }, [appProfile, data]);

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
            <AppRoutes setAppProfile={setAppProfile} />
          </UserContextProvider>
        </SimpleReactLightbox>
      </SnackbarProvider>
    </StyledThemeProvider>
  );
};

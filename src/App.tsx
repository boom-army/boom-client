import GlobalStyles from "@mui/material/GlobalStyles";
import OneSignal from "react-onesignal";
import SimpleReactLightbox from "simple-react-lightbox";
import { AppRoutes } from "./routes";
import { CssBaseline, PaletteMode, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { deepmerge } from '@mui/utils';
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "./contexts/snackbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./contexts/user";
import { getDesignTokens, getThemedComponents, ColorModeContext } from "./contexts/theme";
import { useMemo, useState, useEffect } from "react";
import { useOneSignalQuery } from "./generated/graphql";

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('dark');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  let theme = useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  const isLoggedIn = localStorage.getItem("user");

  const [oneSignalId, setOneSignalId] = useState("");

  const { refetch } = useOneSignalQuery({
    variables: { oneSignalId },
  });

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await OneSignal.init({
          appId: process.env.REACT_APP_ONESIGNAL_APP_ID!,
        });
      }
      const userId = await OneSignal.getUserId();
      if (userId) {
        setOneSignalId(userId);
      }
    })();
  }, [isLoggedIn]);

  OneSignal.on("subscriptionChange", async (isSubscribed: Boolean) => {
    const userId = await OneSignal.getUserId();
    if (isSubscribed) {
      setOneSignalId(userId as string);
      refetch();
    }
  });

  return (
    <RecoilRoot>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              html: {
                fontSize: "16px",
                boxSizing: "border-box",
              },
              "*, *:before, *:after": {
                padding: "0",
                margin: "0",
                boxSizing: "inherit",
              },
              body: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                overflowX: "hidden",
              },
              '*::-webkit-scrollbar': {
                width: "0.4rem",
              },
              '*::-webkit-scrollbar-track': {
                background: theme.palette.background.default,
              },
              '*::-webkit-scrollbar-thumb': {
                background: theme.palette.primary.main,
              },
              ".MuiPaper-root": {
                backgroundColor: `${theme.palette.background.default} !important`,
                color: `${theme.palette.primary} !important`,
              },
              ".MuiListItemIcon-root": {
                color: `${theme.palette.secondary.main} !important`,
              },
              "h1, h2, h3, h4, h5, h6": {
                fontWeight: "normal",
              },
              a: {
                textDecoration: "none",
                color: "inherit",
              },
              li: {
                listStyleType: "none",
              },
              "button:focus, textarea:focus, input:focus": {
                outline: "none",
              },
              ".upload-progress-bar": {
                color: "#FFF",
              },
              textarea: {
                resize: "none",
                overflow: "hidden",
              },
              "button:disabled,button[disabled]": {
                opacity: "0.5",
                cursor: "not-allowed",
              },
              // using svg as input icon
              ".svg-input > input, .avatar-input > input, .cover-photo > input": {
                display: "none",
              },
            }}
          />
          <SnackbarProvider>
            <SimpleReactLightbox>
              <UserContextProvider>
                <AppRoutes />
              </UserContextProvider>
            </SimpleReactLightbox>
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </RecoilRoot>
  );
};

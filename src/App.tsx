import GlobalStyles from "@mui/material/GlobalStyles";
import OneSignal from "react-onesignal";
import SimpleReactLightbox from "simple-react-lightbox";
import { AppRoutes } from "./Routes";
import { CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "./contexts/snackbar";
import { ThemeContext } from "./contexts/theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./contexts/user";
import { useContext, useState, useEffect } from "react";
import { useOneSignalQuery } from "./generated/graphql";

declare module "@mui/material/styles" {
  interface Theme {
    background: string;
    bgHover: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    tertiaryColor: string;
    tertiaryColor2: string;
    overlay: string;
    success: string;
    font: string;
    bs1: string;
    loading: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: string;
    bgHover?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    tertiaryColor: string;
    tertiaryColor2?: string;
    overlay?: string;
    success?: string;
    font?: string;
    bs1?: string;
    loading?: string;
  }
}

export const App = () => {
  const { theme } = useContext(ThemeContext);
  const custom_theme = createTheme(theme);

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
      <ThemeProvider theme={custom_theme}>
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
              backgroundColor: theme.background,
              color: theme.primaryColor,
              overflowX: "hidden",
            },
            '*::-webkit-scrollbar': {
              width: "0.4rem",
            },
            '*::-webkit-scrollbar-track': {
              background: theme.background,
            },
            '*::-webkit-scrollbar-thumb': {
              background: theme.accentColor,
            },
            ".MuiPaper-root": {
              backgroundColor: `${theme.background} !important`,
              color: `${theme.primaryColor} !important`,
            },
            ".MuiListItemIcon-root": {
              color: `${theme.secondaryColor} !important`,
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
    </RecoilRoot>
  );
};

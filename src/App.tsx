import GlobalStyles from "@mui/material/GlobalStyles";
import OneSignal from "react-onesignal";
import SimpleReactLightbox from "simple-react-lightbox";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { AppRoutes } from "./routes";
import { CssBaseline, useTheme } from "@mui/material";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "./contexts/snackbar";
import { ThemePicker } from "./contexts/theme";
import { UserContextProvider } from "./contexts/user";
import { useState, useEffect } from "react";
import { useOneSignalQuery } from "./generated/graphql";
import { ThemeShades } from "./constants/themeVars";

dayjs.extend(duration);

declare module "@mui/material/styles" {
  interface Theme {
    background: string;
    background2: string;
    bgHover: string;
    accentColor: string;
    tertiaryColor: string;
    tertiaryColor2: string;
    overlay: string;
    bs1: string;
    blue: ThemeShades;
    grey: ThemeShades;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: string;
    background2?: string;
    bgHover?: string;
    accentColor?: string;
    tertiaryColor: string;
    tertiaryColor2?: string;
    overlay?: string;
    bs1?: string;
    blue: ThemeShades;
    grey: ThemeShades;
  }
}

export const App = () => {
  const theme = useTheme();

  const isLoggedIn = localStorage.getItem("user");

  const [oneSignalId, setOneSignalId] = useState("");

  const { refetch } = useOneSignalQuery({
    variables: { oneSignalId },
  });

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await OneSignal.init({
          appId: import.meta.env.VITE_ONESIGNAL_APP_ID!,
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

  const globalStyles = {
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
      color: theme.palette.primary,
      overflowX: "hidden",
    },
    "*::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "*::-webkit-scrollbar-track": {
      background: theme.background,
    },
    "*::-webkit-scrollbar-thumb": {
      background: theme.accentColor,
    },
    ".MuiPaper-root": {
      backgroundColor: `${theme.background} !important`,
      color: `${theme.palette.primary} !important`,
    },
    ".MuiListItemIcon-root": {
      color: `${theme.palette.secondary} !important`,
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
  };

  return (
    <RecoilRoot>
      <ThemePicker>
        <CssBaseline />
        <GlobalStyles
          // @ts-ignore
          styles={globalStyles}
        />
        <SnackbarProvider>
          <SimpleReactLightbox>
            <UserContextProvider>
              <AppRoutes />
            </UserContextProvider>
          </SimpleReactLightbox>
        </SnackbarProvider>
      </ThemePicker>
    </RecoilRoot>
  );
};

import OneSignal from "react-onesignal";
import SimpleReactLightbox from "simple-react-lightbox";
import { AppRoutes } from "./routes";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeContext } from "./contexts/theme";
import { useContext, useState, useEffect } from "react";
import { useOneSignalQuery } from "./generated/graphql";
import { UserContextProvider } from "./contexts/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
declare module '@mui/material/styles' {
  interface Theme {
    background: string;
    bgHover: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    tertiaryColor: string;
    tertiaryColor2: string;
    overlay: string;
    font: string;
    bs1: string;
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
    font?: string;
    bs1?: string;
  }
};

export const App = () => {
  const { theme } = useContext(ThemeContext);
  const custom_theme = createTheme((theme));


  const isLoggedIn = localStorage.getItem("user");
  const [oneSignalPlayer, setOneSignalPlayer] = useState("");

  // const { refetch } = useOneSignalQuery({
  //   variables: { oneSignalId: oneSignalPlayer },
  // });

  // useEffect(() => {
  //   (async () => {
  //     if (isLoggedIn) {
  //       await OneSignal.init({
  //         appId: process.env.REACT_APP_ONESIGNAL_APP_ID as string,
  //       });
  //     }
  //     const userId = await OneSignal.getUserId();
  //     if (userId) {
  //       setOneSignalPlayer(userId as string);
  //     }
  //   })();
  // }, [isLoggedIn]);

  // OneSignal.on("subscriptionChange", async (isSubscribed: Boolean) => {
  //   const userId = await OneSignal.getUserId();
  //   if (isSubscribed) {
  //     setOneSignalPlayer(userId as string);
  //     refetch();
  //   }
  // });

  return (
    <ThemeProvider theme={custom_theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        'html': {
          fontSize: '16px',
          boxSizing: 'border-box',
        },
        '*, *:before, *:after': {
          padding: '0',
          margin: '0',
          boxSizing: 'inherit',
        },
        'body': {
          backgroundColor: theme.background,
          color: theme.primaryColor,
          lineHeight: '1.8',
          overflowX: 'hidden',
        },
        'body::WebkitScrollbar': {
          width: '0.25rem',
        },
        'body::WebkitScrollbarTrack': {
          background: theme.background,
        },
        'body::WebkitScrollbarThumb': {
          background: theme.accentColor,
        },
        '.MuiPaper-root': {
          backgroundColor: `${theme.background} !important`,
          color: `${theme.primaryColor} !important`,
        },
        '.MuiListItemIcon-root': {
          color: '#657786 !important'
        },
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: 'normal',
        },
        'a': {
          textDecoration: 'none',
          color: 'inherit',
        },
        'li': {
          listStyleType: 'none',
        },
        'button:focus, textarea:focus, input:focus': {
          outline: 'none'
        },
        '.upload-progress-bar': {
          color: '#FFF',
        },
        'textarea': {
          resize: 'none',
          overflow: 'hidden',
        },
        'button:disabled,button[disabled]': {
          opacity: '0.5',
          cursor: 'not-allowed',
        },
        // using svg as input icon
        '.svg-input > input, .avatar-input > input, .cover-photo > input': {
          display: 'none',
        }
      }} />
      <SnackbarProvider maxSnack={3}>
        <SimpleReactLightbox>
          <UserContextProvider>
            <AppRoutes />
          </UserContextProvider>
        </SimpleReactLightbox>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

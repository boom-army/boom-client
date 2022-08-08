import { PaletteMode, ThemeOptions } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { createContext } from "react";

const palette = {
  light: {
    primary: {
      main: '#34C0AC',
      light: '#B1DED3',
      dark: '#00765A',
    },
  },
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: palette.light.primary.main
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: "#274C66"
        },
        divider: "#374148",
        background: {
          default: '#15202b',
          paper: '#0E1B25',
        },
        text: {
          primary: '#FFF',
          secondary: '#CCC',
        },
      }),
  },
});

export const getThemedComponents = (mode: PaletteMode): ThemeOptions => ({
  components: {
    ...(mode === 'light'
      ? {
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: grey[300],
            },
          },
        },
      }
      : {
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: blue[500],
            },
          },
        },
      }),
  },
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

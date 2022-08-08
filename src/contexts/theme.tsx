import { PaletteMode, ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TypographyOptions } from "@mui/material/styles/createTypography";
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

const typography: TypographyOptions = {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Noto Sans Display"',
      '"Trebuchet MS"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    h1: {
      fontSize: 30,
      fontWeight: 600,
      lineHeight: 1.8
    },
    h2: {
      fontSize: 26,
      fontWeight: 600,
      lineHeight: 1.2
    },
    h3: {
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 1.2
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.2
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.2
    },
    body2: {
      fontWeight: 300
    }
};

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  typography,
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
          main: "#CA2055"
        },
        secondary: {
          main: "#657786"
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
              // backgroundColor: blue[500],
            },
          },
        },
      }),
  },
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

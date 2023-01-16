export interface ThemeVars {
  background: string;
  background2: string;
  bgHover: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  tertiaryColor: string;
  tertiaryColor2: string;
  overlay: string;
  success: string;
  error: string;
  warning: string;
  bs1: string;
  blue: Shades;
  grey: Shades;
}

interface Shades {
  lightest?: string;
  lighter?: string;
  light?: string;
  dark?: string;
  darker?: string;
  darkest?: string;
}

const themeColors = {
  blue: {
    lightest: "#4D97CB",
    lighter: "#316081",
    light: "#274C66",
    dark: "#152937",
    darker: "#122430",
    darkest: "#0E1B25",
  },
  grey: {
    lighter: "#D8DCDE",
    light: "#949A9E",
    dark: "#374148",
  },
};

const fontSettings = {
  typography: {
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
    fontWeight: 400,
    fontWeightLight: 300,
    fontWeightSemiBold: 600,
    fontWeightExtraBold: 800,
    h1: {
      fontSize: 30,
      fontWeight: 600,
      lineHeight: "1.8rem",
    },
    h2: {
      fontSize: 26,
      fontWeight: 600,
      lineHeight: "1.2rem",
    },
    h3: {
      fontSize: 22,
      fontWeight: 600,
      lineHeight: "1.2rem",
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: "1.2rem",
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "1.2rem",
    },
    body2: {
      fontWeight: 300,
    },
  },
};

const accent = "#CA2055";

const overRides = {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: ThemeVars }) => ({
          boxShadow: `${theme.background2} 0px 3px 5px`,
        }),
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }: { theme: ThemeVars }) => ({
          color: theme.primaryColor,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: ThemeVars }) => ({
          "& fieldset": {
            borderColor: theme.tertiaryColor,
          }
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }: { theme: ThemeVars }) => ({
          borderBottomColor: theme.tertiaryColor,
        }),
      },
    },
  },
};

export const lightTheme = {
  background: "#FFF",
  background2: "#F5F8FA",
  bgHover: "#F5F8FA",
  primaryColor: "#17141A",
  secondaryColor: "#657786",
  accentColor: accent,
  tertiaryColor: "#CCD6DD",
  tertiaryColor2: "#F5F8FA",
  success: "#0DA600",
  error: "#FD0069",
  warning: "#FEAB07",
  overlay: "rgba(147, 149, 150, 0.4)",
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  palette: {
    text: {
      primary: "#17141A",
      secondary: "#666",
    },
    primary: {
      main: accent,
    },
  },
  ...fontSettings,
  ...themeColors,
  ...overRides,
};

export const darkTheme = {
  background: "#15202b",
  background2: "#0E1B25",
  bgHover: "#192734",
  primaryColor: "#FFF",
  secondaryColor: "#657786",
  accentColor: accent,
  tertiaryColor: "#38444D",
  tertiaryColor2: "#202E3A",
  success: "#0DA600",
  error: "#FD0069",
  warning: "#FEAB07",
  overlay: "rgba(110, 118, 125, 0.4)",
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  palette: {
    text: {
      primary: "#FFF",
      secondary: "#CCC",
    },
    primary: {
      main: accent,
    },
  },
  ...fontSettings,
  ...themeColors,
  ...overRides,
};

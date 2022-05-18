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
  bs1: string;
  bluePrimary: string;
  blueSecondary: string;
}

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
  },
};

const themeBlues = {
  bluePrimary: "#315881",
  blueSecondary: "#4D97CB"
}

export const lightTheme = {
  background: "#FFF",
  background2: "#F5F8FA",
  bgHover: "#F5F8FA",
  primaryColor: "#17141A",
  secondaryColor: "#657786",
  accentColor: "#CA2055",
  tertiaryColor: "#CCD6DD",
  tertiaryColor2: "#F5F8FA",
  success: "#0DA600",
  overlay: "rgba(147, 149, 150, 0.4)",
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  palette: {
    text: {
      primary: "#17141A",
      secondary: "#666",
    }
  },
  ...fontSettings,
  ...themeBlues,
};

export const darkTheme = {
  background: "#15202b",
  background2: "#0E1B25",
  bgHover: "#192734",
  primaryColor: "#FFF",
  secondaryColor: "#657786",
  accentColor: "#CA2055",
  tertiaryColor: "#38444D",
  tertiaryColor2: "#202E3A",
  success: "#0DA600",
  overlay: "rgba(110, 118, 125, 0.4)",
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  palette: {
    text: {
      primary: "#FFF",
      secondary: "#CCC",
    }
  },
  ...fontSettings,
  ...themeBlues,
};

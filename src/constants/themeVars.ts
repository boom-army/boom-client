import { Components, Theme, ThemeVars } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export interface CustomThemeVars extends ThemeVars {
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

export interface ThemeShades {
  lightest?: string;
  lighter?: string;
  light?: string;
  dark?: string;
  darker?: string;
  darkest?: string;
}

const colors = [
  "#CA2055",
  "#1DA1F2",
  "#FFAD1F",
  "#794BC4",
  "#F45D22",
  "#17BF63",
];

const palette = {
  primary: {
    main: "#F5F8FA",
  },
  secondary: {
    main: "#657786",
  },
  success: {
    main: "#0DA600",
  },
  error: {
    main: "#FD0069",
  },
  warning: {
    main: "#FEAB07",
  },
};

export const paletteDark = {
  background: {
    default: "#15202b",
    paper: "#0E1B25",
  },
  text: {
    primary: '#F5F8FA',
  },
  ...palette,
};

export const paletteLight = {
  background: {
    default: "#FFF",
    paper: "#F5F8FA",
  },
  text: {
    primary: '#15202b',
  },
  ...palette,
};

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

export const lightTheme = {
  background: "#FFF",
  background2: "#F5F8FA",
  bgHover: "#F5F8FA",
  accentColor: colors[0],
  tertiaryColor: "#CCD6DD",
  tertiaryColor2: "#F5F8FA",
  overlay: "rgba(147, 149, 150, 0.4)",
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  ...themeColors,
};

export const darkTheme = {
  background: "#15202b",
  background2: "#0E1B25",
  bgHover: "#192734",
  accentColor: colors[0],
  tertiaryColor: "#38444D",
  tertiaryColor2: "#202E3A",
  overlay: "rgba(110, 118, 125, 0.4)",
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  ...themeColors,
};

export const components: Components = {
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        boxShadow: `${theme.background2} 0px 3px 5px`,
      }),
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        color: theme.palette.primary,
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        "& fieldset": {
          borderColor: theme.tertiaryColor,
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderBottomColor: theme.tertiaryColor,
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        color: theme.palette.primary,
        borderColor: theme.tertiaryColor2,
      }),
    },
  },
};

export const typography: TypographyOptions = {
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
};

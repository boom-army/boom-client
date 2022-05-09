export interface ThemeVars {
  background: string;
  bgHover: string;
  primaryColor: string;
  secondaryColor: string;
  blueLight: string;
  accentColor: string;
  tertiaryColor: string;
  tertiaryColor2: string;
  overlay: string;
  font: string;
  bs1: string;
  greenLight: string;
  borderColor: string;
  textColor: string;
  tagColor: string;
}

export const lightTheme: ThemeVars = {
  background: "#FFF",
  bgHover: "#F5F8FA",
  primaryColor: "#17141A",
  secondaryColor: "#657786",
  blueLight: "#4D97CB",
  accentColor: "#CA2055",
  tertiaryColor: "#CCD6DD",
  tertiaryColor2: "#F5F8FA",
  overlay: "rgba(147, 149, 150, 0.4)",
  font: '"Roboto", sans-serif',
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  greenLight: "#35a600",
  borderColor: "#838689",
  textColor: "#838689",
  tagColor: "#949a9e",
};

export const darkTheme: ThemeVars = {
  background: "#15202b",
  bgHover: "#192734",
  primaryColor: "#FFF",
  secondaryColor: "#657786",
  blueLight: "#4D97CB",
  accentColor: "#CA2055",
  tertiaryColor: "#38444D",
  tertiaryColor2: "#202E3A",
  overlay: "rgba(110, 118, 125, 0.4)",
  font: '"Roboto", sans-serif',
  bs1: "0 0 6px 3px rgba(0,0,0,0.1)",
  greenLight: "#35a600",
  borderColor: "#374148",
  textColor: "#838689",
  tagColor: "#949a9e",
};

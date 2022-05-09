import React from "react";
import { darkTheme, lightTheme, ThemeVars } from "../styles/themes";

export enum Theme {
  StorageTag = "theme",
  Dark = "dark",
  Light = "light",
}

export type ThemeContextType = {
  theme: ThemeVars;
  setTheme: (c: any) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: darkTheme,
  setTheme: (theme) => console.warn("no theme provider"),
});

export const ThemeProvider: React.FC<{children: JSX.Element}> = ({ children }) => {
  const themeSet =
    localStorage.getItem(Theme.StorageTag) === Theme.Light
      ? lightTheme
      : darkTheme;

  const [theme, setTheme] = React.useState(themeSet);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  components,
  darkTheme,
  lightTheme,
  palette,
  typography,
} from "../constants/themeVars";

export enum Theme {
  TAG = "theme",
  DARK = "dark",
  LIGHT = "light",
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const ThemePicker: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<Theme.DARK | Theme.LIGHT>(Theme.LIGHT);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        localStorage.setItem(Theme.TAG, newMode);
        setMode(newMode);
      },
    }),
    []
  );

  useEffect(() => {
    const storedThemeMode = localStorage.getItem(Theme.TAG);
    if (
      storedThemeMode &&
      (storedThemeMode === Theme.LIGHT || storedThemeMode === Theme.DARK)
    ) {
      setMode(storedThemeMode);
    }
  }, []);

  const theme = useMemo(() => {
    const activeTheme = mode === Theme.DARK ? darkTheme : lightTheme;
    console.log("boom", activeTheme);
    return createTheme({
      palette: {
        mode,
        ...palette,
      },
      ...activeTheme,
      ...components,
      ...typography,
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

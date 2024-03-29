import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  components,
  darkTheme,
  lightTheme,
  paletteDark,
  paletteLight,
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
  const [mode, setMode] = useState<Theme.DARK | Theme.LIGHT>(Theme.DARK);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((mode) => {
          const newMode = mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
          localStorage.setItem(Theme.TAG, newMode);
          return newMode;
        });
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
    const palette = mode === Theme.DARK ? paletteDark : paletteLight;
    return createTheme({
      palette: {
        mode,
        ...palette,
      },
      ...activeTheme,
      ...components,
      ...typography,
      shape: {
        borderRadius: 0,
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

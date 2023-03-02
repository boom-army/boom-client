import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import { lightTheme, darkTheme, ThemeVars } from "../styles/themes";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { Stack, Typography } from "@mui/material";

export const ToggleTheme = ({ iconProps, stackProps }: any) => {
  const localSt = localStorage.getItem("theme");
  const [currentTheme, setCurrentTheme] = useState(localSt ? localSt : "dark");

  const { setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme((theme: ThemeVars) => ({
        ...theme,
        ...lightTheme,
      }));
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
    } else {
      setTheme((theme: ThemeVars) => ({
        ...theme,
        ...darkTheme,
      }));
      localStorage.setItem("theme", "dark");
      setCurrentTheme("dark");
    }
  };

  return (
    <Stack
      onClick={toggleTheme}
      direction="row"
      {...stackProps}
      sx={{ cursor: "pointer" }}
    >
      <InvertColorsIcon sx={iconProps} />
      <Typography variant="body1">Theme</Typography>
    </Stack>
  );
};

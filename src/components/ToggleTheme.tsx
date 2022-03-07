import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import { lightTheme, darkTheme, ThemeVars } from "../styles/themes";
import { ThemeIcon } from "./Icons";
import { styled } from "@mui/material/styles";

export const Wrapper = styled("div")({
  display: "flex",
  alignItems: "baseline",
  marginLeft: "0.7rem",
  marginBottom: "1rem",
  cursor: "pointer",
  p: {
    marginLeft: "0.4rem",
  },
});

const ToggleTheme = () => {
  const localSt = localStorage.getItem("theme");
  const [currentTheme, setCurrentTheme] = useState(localSt ? localSt : "dark");

  const { theme, setTheme } = useContext(ThemeContext);

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
    <Wrapper onClick={toggleTheme}>
      <ThemeIcon sm="true" color={theme.accentColor} />
      <p>Theme</p>
    </Wrapper>
  );
};

export default ToggleTheme;

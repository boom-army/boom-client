import PaletteIcon from '@mui/icons-material/Palette';
import { Stack, Typography } from "@mui/material";
import { ThemeContext } from "../contexts/theme";
import { useState, useContext } from "react";

export const ChangeColor = ({ iconProps, stackProps }: any) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const colors = [
    "#CA2055",
    "#1DA1F2",
    "#FFAD1F",
    "#794BC4",
    "#F45D22",
    "#17BF63",
  ];

  const [currentColor, setCurrentColor] = useState(colors[0]);

  const changeColor = () => {
    let newAccentColor;

    if (colors.indexOf(currentColor) === colors.length - 1) {
      newAccentColor = colors[0];
    } else {
      newAccentColor = colors[colors.indexOf(currentColor) + 1];
    }    

    setTheme({
      ...theme,
      accentColor: newAccentColor,
      pallette: {
        primary: {
          main: newAccentColor,
        }
      }
    });

    setCurrentColor(newAccentColor);
  };

  return (
      <Stack onClick={changeColor} direction="row" {...stackProps} sx={{cursor: "pointer"}}>
        <PaletteIcon sx={iconProps} />
        <Typography variant="body1">Color</Typography>
      </Stack>
  );
};

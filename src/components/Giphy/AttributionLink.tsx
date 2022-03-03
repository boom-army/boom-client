import React, { useContext } from "react";
import Link from "@mui/material/Link";
import { styled } from "@mui/system";
import { ThemeContext } from "../../contexts/theme";
import { darkTheme } from "../../styles/themes";

export const AttributionLink: React.FC<{ src: any |null}> = ({ src }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme.primaryColor === darkTheme.primaryColor;

  const GiphyAttributionImg = styled("img")({
    boxSizing: "content-box",
    borderBottom: "2px solid transparent",
    paddingBottom: "3px",
    "&:hover": {
      borderBottom: `2px solid ${theme.tertiaryColor}`,
    },
  });

  return (
    <Link href={src} target="_blank">
      <GiphyAttributionImg
        width="150px"
        src={`/assets/giphy-${isDarkTheme ? "dark" : "light"}.png`}
        alt="Powered by Giphy"
      />
    </Link>
  );
};

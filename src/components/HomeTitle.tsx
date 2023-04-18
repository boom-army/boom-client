import React, { FC, useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import { Typography, styled } from "@mui/material";

interface HomeTitleProps {
  title: string;
  sx?: any;
}

export const HomeTitle: FC<HomeTitleProps> = ({ title, sx }) => {
  const { theme } = useContext(ThemeContext);

  const HomeTitle = styled(Typography)({
    backgroundColor: theme.background2,
    padding: "0.2rem 1rem",
    borderRadius: "0.2rem",
    fontWeight: 300,
    fontSize: "0.8rem",
    textTransform: "uppercase",
    color: theme.secondaryColor,
  });
  return <HomeTitle sx={sx}>{title}</HomeTitle>;
};

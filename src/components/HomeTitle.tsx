import React, { FC, useContext } from "react";
import { Typography, styled, Box, Link, useTheme } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";

interface HomeTitleProps {
  title: string;
  sx?: any;
  titleLink?: string;
}

export const HomeTitle: FC<HomeTitleProps> = ({ title, sx, titleLink }) => {
  const theme = useTheme();

  const HomeBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.background2,
    padding: "0.2rem 1rem",
    borderRadius: "0.2rem",
    textTransform: "uppercase",
    color: theme.palette.secondary,
    alignItems: "center",
    ...sx,
    "&:hover": {
      backgroundColor: theme.accentColor,
      color: "white",
      "& svg": {
        color: "white",
      },
    },
  });

  return (
    <Link href={titleLink} sx={{ display: "block", textDecoration: "none" }}>
      <HomeBox>
        <Typography sx={{ fontWeight: 300, fontSize: "0.8rem" }}>
          {title}
        </Typography>
        {titleLink && (
          <LinkIcon sx={{ fontSize: "1rem", color: theme.accentColor }} />
        )}
      </HomeBox>
    </Link>
  );
};

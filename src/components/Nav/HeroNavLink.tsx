import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../constants";

interface HeroNavLinkProps {
  icon: ReactElement;
  label: string;
  description: string;
  routePath: RoutePath;
}

export const HeroNavLink: React.FC<HeroNavLinkProps> = ({
  icon,
  label,
  description,
  routePath,
}) => {
  const theme = useTheme();

  const applyActiveStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive
      ? theme.accentColor
      : (theme.palette.secondary.main),
    width: "100%",
  });

  const h5Styles = {
    my: 0.5,
  };
  const stackProps = {
    justifyContent: "flex-start",
    flexGrow: 1,
    spacing: 2,
    alignItems: "center",
    backgroundColor: theme.blue.darker,
    sx: {
      borderRadius: "3px",
      border: `1px solid ${alpha(theme.accentColor, 0.5)}`,
      width: "100%",
      p: 1,
      "&:hover": {
        backgroundColor: alpha(theme.accentColor, 0.2),
      },
    },
  };

  return (
    <NavLink end style={applyActiveStyles} to={routePath}>
      <Box {...stackProps}>
        <Stack direction="row" alignItems="top">
          <Box>{icon}</Box>
          <Box ml={1}>
            <Typography variant="h5" sx={h5Styles}>
              {label}
            </Typography>
            <Typography variant="body2" color="secondary">
              {description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </NavLink>
  );
};

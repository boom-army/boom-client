import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { ThemeContext } from "styled-components";
import { ThemeVars } from "../styles/themes";
import { styled } from "@mui/system";

export const Loader = () => {
  const theme = useContext<ThemeVars>(ThemeContext);

  const StyledCircularProgress = styled(CircularProgress)`
    color: ${theme.accentColor};
  `;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <StyledCircularProgress size={30} />
    </Box>
  );
};

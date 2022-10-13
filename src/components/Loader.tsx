import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCircularProgress = styled(CircularProgress)((props: any) => ({
  color: props.theme.accentColor,
}));

interface LoaderProps {
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <StyledCircularProgress size={size || 30} />
    </Box>
  );
};

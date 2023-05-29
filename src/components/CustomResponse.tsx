import React from "react";
import { Box, Typography } from "@mui/material";

export const CustomResponse = ({ text }: any) => (
  <Box
    sx={{
      minHeight: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      p: 2,
    }}
  >
    <Typography align="center">{text}</Typography>
  </Box>
);

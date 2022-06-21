import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const CustomResponse = ({ text }: any) => (
  <Box
    sx={{
      minHeight: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Typography align="center">{text}</Typography>
  </Box>
);

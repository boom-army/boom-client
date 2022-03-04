import React from "react";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")({
  height: "70vh",
  fontSize: "1.1rem",
  textAlign: "justify",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "4rem",
  "@media screen and (max-width: 530px)": {
    fontSize: "1rem",
  },
});

export const CustomResponse = ({ text }: any) => (
  <Wrapper>
    <p>{text}</p>
  </Wrapper>
);

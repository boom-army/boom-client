import React from "react";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")({
  height: "70vh",
  fontSize: "1.1rem",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default ({ text }: any) => (
  <Wrapper>
    <p>{text}</p>
  </Wrapper>
);

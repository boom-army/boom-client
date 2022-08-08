import React from "react";
import { styled } from "@mui/material/styles";

interface InputProps {
  lg?: any;
  type?: string;
  text?: string;
  value?: string;
  onChange?: any;
  placeholder?: string;
  fullWidth?: boolean;
  hideLabel?: boolean;
}

const Wrapper = styled("div")<{
  lg?: any;
  fullWidth?: any;
  props?: any;
}>((props) => ({
  width: `${(props.fullWidth ? "100%" : "315px") || (props.lg && "100%")}`,
  background: `${props.theme.palette.secondary.dark}`,
  padding: "0.2rem 0.4rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderBottom: `1px solid ${props.theme.palette.primary.main}`,
  marginBottom: "2rem",

  input: {
    width: "100%",
    padding: "0.5rem",
    background: "inherit",
    border: "none",
    fontSize: "1rem",
    fontFamily: props.theme.typography.fontFamily,
    color: props.theme.palette.primary.main,
  },

  label: {
    color: props.theme.palette.secondary.main,
    marginBottom: "2px",
  },

  "label.fullWidth": {
    width: "100%",
  },

  "label.hideLabel": {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  },
}));

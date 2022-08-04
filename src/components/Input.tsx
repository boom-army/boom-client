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
  background: `${props.theme.tertiaryColor2}`,
  padding: "0.2rem 0.4rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderBottom: `1px solid ${props.theme.accentColor}`,
  marginBottom: "2rem",

  input: {
    width: "100%",
    padding: "0.5rem",
    background: "inherit",
    border: "none",
    fontSize: "1rem",
    fontFamily: props.theme.font,
    color: props.theme.primaryColor,
  },

  label: {
    color: props.theme.secondaryColor,
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

const Input = ({
  lg = false,
  type = "text",
  text,
  value,
  onChange,
  placeholder,
  fullWidth = false,
  hideLabel = false,
}: InputProps) => {
  return (
    <Wrapper lg={lg === false ? "false" : "true"}>
      <label className={hideLabel ? "hideLabel" : ""}>{text}</label>
      <input
        autoComplete="new-password"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Input;

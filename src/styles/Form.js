import { styled } from "@mui/material/styles";

export default styled("form")((props) => ({
  width: (props.lg && "98%") || "380px",
  border: (props.lg && "none") || `1px solid ${props.theme.tertiaryColor}`,
  padding: "2rem",
  borderRadius: (props.lg && "none") || "10px",

  span: {
    textAlign: "center",
    display: "block",
    marginBottom: "0.5rem",
    color: props.theme.secondaryColor,
  },

  ".group-input": {
    display: "flex",
    justifyContent: "space-between",

    "div:nth-child(1)": {
      marginRight: "1rem",
    },
  },

  position: props.center && "absolute",
  top: props.center && "50%",
  left: props.center && "50%",
  transform: props.center && "translate(-50%, -50%)",

  "@media screen and (max-width: 400px)": {
    width: "360px",
  },
}));

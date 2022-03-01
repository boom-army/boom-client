import { styled } from "@mui/material/styles";

export default styled("button")((props) => ({
  padding: props.sm ? "0.4rem 1rem" : "0.4rem 1.8rem",
  color: props.outline ? props.theme.accentColor : "#FFF",
  background: `${props.outline ? "inherit" : props.theme.accentColor}`,
  border: `1px solid ${props.theme.accentColor}`,
  borderRadius: "50px",
  fontSize: props.sm ? "0.8rem" : "1rem",
  letterSpacing: "1px",
  textTransform: "uppercase",
  cursor: "pointer",
  marginBottom: "0.5rem",
  width: props.xl && "100%",
  position: props.relative && "relative",
  left: props.relative && "52%",

  "@media screen and (max-width: 530px)": {
    fontSize: "0.8rem",
    position: props.relative && "relative",
    left: props.relative && "32%",
  },

  "@media screen and (max-width: 430px)": {
    position: props.relative && "relative",
    left: props.relative && "17%",
  },
}));

import { styled } from "@mui/material/styles";

const Svg = styled("svg")<{ sm?: any; loading?: any; props?: any }>(
  (props) => ({
    fill: props.color ? props.color : props.theme.palette.primary.main,
    width: "16px",
    height: "16px",
    cursor: props.loading ? "not-allowed" : "pointer",
  })
);

export const DimmedSvg = styled("svg")<{
  sm?: any;
  loading?: any;
  props?: any;
}>((props) => ({
  fill: props.theme.palette.secondary.main,
  width: "16px",
  height: "16px",
  opacity: props.loading === "loading" ? "0.5" : "1",
  cursor: props.loading ? "not-allowed" : "pointer",
  "&:hover svg path": {
    fill: props.theme.palette.primary.main,
  },
}));

export default Svg;

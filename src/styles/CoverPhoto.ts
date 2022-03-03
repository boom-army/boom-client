import { styled } from "@mui/material/styles";

export default styled("img")<{src:string|undefined|null}>({
  height: "200px",
  width: "100%",
  objectFit: "cover",
});

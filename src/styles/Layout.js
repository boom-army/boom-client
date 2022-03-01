import { styled } from "@mui/material/styles";

export default styled("div")({
  marginLeft: "14.6%",
  display: "grid",
  gridTemplateColumns: "65% 1fr",

  "@media screen and (max-width: 1110px)": {
    gridTemplateColumns: "1fr",
    marginLeft: "10%",
  },

  "@media screen and (max-width: 530px)": {
    marginLeft: "0",
    gridTemplateColumns: "1fr",
  },
});

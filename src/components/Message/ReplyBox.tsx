import { Box, styled } from "@mui/material";

export const ReplyBox = styled(Box)(({ theme }) => ({
  position: "relative",

  "&:before, &:after": {
    content: '""',
    display: "block",
    position: "absolute",
    backgroundColor: `${theme.accentColor}`,
    boxSizing: "border-box",
  },

  "&:before": {
    width: "1.7em",
    height: "1px", // Match border thickness
    top: "40%",
    left: "0.85em",
  },

  "&:after": {
    width: "1px", // Match border thickness
    height: "0.7em",
    top: "40%",
    left: "0.85em",
  },
}));

import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Popup from "reactjs-popup";
import ToggleTheme from "./ToggleTheme";
import Logout from "./Auth/Logout";
import { ChangeColor } from "./ChangeColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Stack, Typography } from "@mui/material";
import { ThemeContext } from "../contexts/theme";

const Wrapper = styled("div")({
  ".btn": {
    cursor: "pointer",
  },
});

const StyledPopup = styled(Popup)({
  "@media (max-width: 899px)": {
    position: "absolute",
    right: "13em",
    top: "3em",
    zIndex: 9999,
  },
});

interface Props {
  open?: boolean;
  iconProps?: any;
  stackProps?: any;
}

const MoreBtn = React.forwardRef(
  (
    { open, iconProps, stackProps, ...props }: Props,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    return (
      <div ref={ref} {...props}>
        <Stack direction="row" {...stackProps} sx={{ cursor: "pointer" }}>
          <MoreHorizIcon sx={iconProps} />
          <Typography
            variant="body1"
            display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          >
            More
          </Typography>
        </Stack>
      </div>
    );
  }
);

export const MorePopUp = ({ iconProps, stackProps }: Props) => {
  const { theme } = useContext(ThemeContext);

  const contentStyle = {
    width: "160px",
    background: theme.background,
    borderRadius: "6px",
    border: `1px solid ${theme.tertiaryColor}`,
    boxShadow: theme.bs1,
    padding: "1rem 1rem 0 1rem",
  };

  const overlayStyle = {
    background: "none",
  };

  return (
    <Wrapper>
      <StyledPopup
        className="btn"
        trigger={(open) => (
          <MoreBtn open={open} iconProps={iconProps} stackProps={stackProps} />
        )}
        position="top left"
        closeOnDocumentClick
        contentStyle={contentStyle}
        overlayStyle={overlayStyle}
        arrow={false}
      >
        <ToggleTheme />
        <ChangeColor />
        <Logout />
      </StyledPopup>
    </Wrapper>
  );
};

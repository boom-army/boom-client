import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import Popup from "reactjs-popup";
import ToggleTheme from "./ToggleTheme";
import Logout from "./Auth/Logout";
import ChangeColor from "./ChangeColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Wrapper = styled.div`
  .btn {
    cursor: pointer;
  }
`;

const MoreBtn = React.forwardRef(({ open, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <MoreHorizIcon />
      <span className="btn">More</span>
    </div>
  );
});

export const MorePopUp = () => {
  const theme = useContext(ThemeContext);

  const contentStyle = {
    width: "160px",
    background: theme.background,
    borderRadius: "6px",
    border: `1px solid ${theme.tertiaryColor}`,
    boxShadow: theme.bs1,
  };

  const overlayStyle = {
    background: "none",
  };

  return (
    <Wrapper>
      <Popup
        className="btn"
        trigger={(open) => <MoreBtn open={open} />}
        position="top right"
        closeOnDocumentClick
        contentStyle={contentStyle}
        overlayStyle={overlayStyle}
        arrow={false}
      >
        <ToggleTheme />
        <ChangeColor />
        <Logout />
      </Popup>
    </Wrapper>
  );
};

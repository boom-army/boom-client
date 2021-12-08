import React, { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/theme";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

interface Props {
  parentTweet: String | undefined;
}

export const ParentTweet: React.FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);
  const user = localStorage.getItem("user");
  const [currentUser] = useState(JSON.parse(user as string));

  return (
    <>
      <Box sx={{ background: theme.tertiaryColor, padding: "1rem" }}>
        <Link to={`/${currentUser.handle}/status/${props.parentTweet}`}>
          <MuiLink>Go up thread to parent &#x2934;</MuiLink>
        </Link>
      </Box>
    </>
  );
};

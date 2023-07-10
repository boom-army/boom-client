import React, { useContext } from "react";

import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { RoutePath } from "../../constants";
import { useTheme } from "@mui/material";

interface Props {
  parentTweet: String | undefined;
  masterTweet: String | undefined;
}

export const ParentTweet: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);

  return (
    <>
      <Box
        sx={{
          background: theme.tertiaryColor,
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to={`/${RoutePath.MEEP_HASH}/${props.parentTweet}`}>
          Jump up thread &#x2934;
        </Link>
        <Link to={`/${RoutePath.MEEP_HASH}/${props.masterTweet}`}>
          Jump to original &#x2934;
        </Link>
      </Box>
    </>
  );
};

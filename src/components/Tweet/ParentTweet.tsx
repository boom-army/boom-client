import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/theme";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { RoutePath } from "../../constants";

interface Props {
  parentTweet: String | undefined;
  masterTweet: String | undefined;
}

export const ParentTweet: React.FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);
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
        <Link to={`${RoutePath.HANDLE_HASH}/${user?.handle}/${props.parentTweet}`}>
          Jump up thread &#x2934;
        </Link>
        <Link to={`${RoutePath.HANDLE_HASH}/${user?.handle}/${props.masterTweet}`}>
          Jump to original &#x2934;
        </Link>
      </Box>
    </>
  );
};

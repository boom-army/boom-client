import React, { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";

interface Props {
  parentTweet: String | undefined;
}

export const ParentTweet: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);

  return (
    <>
      <Box sx={{ background: theme.palette.secondary.dark, padding: "1rem" }}>
        <Link to={`/${user?.handle}/status/${props.parentTweet}`}>
          Go up thread to parent &#x2934;
        </Link>
      </Box>
    </>
  );
};

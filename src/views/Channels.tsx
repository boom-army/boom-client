import { Avatar, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

export const ChannelView: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Box
        m={1}
        p={1}
        sx={{
          backgroundColor: theme.secondaryColor,
          borderRadius: 1,
          display: "flex",
        }}
      >
        <Box mr={1}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Box>
              <Typography variant="h3">Boom.Army</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body2">Members</Typography>
            </Box>
            <Box>
              <Typography variant="body2">2nSv...A67s</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

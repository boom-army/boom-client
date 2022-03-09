import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Box, Typography } from "@mui/material";
import { ThemeContext } from "../contexts/theme";
import { styled } from "@mui/material/styles";

export const ChannelView: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [channelActive, toggleChannelActive] = useState(false);

  const toggleChannel = () => {
    toggleChannelActive(!channelActive);
  };

  const BoxStyled = styled(Box)({
    h3: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "22px",
      padding: "0.2em 0 0.5em",
    },
    "& .MuiTypography-body2": {
      fontWeight: 300,
    },
    "@media screen and (max-width: 530px)": {
      margin: 0,
      marginTop: "1em",
    },
  });

  return (
    <>
      <Box m={1}>
        <Typography variant="h2" sx={{ fontSize: "18px" }}>Select channels to display</Typography>
      </Box>
      <BoxStyled
        sx={{
          backgroundColor: !channelActive
            ? theme.bluePrimary
            : theme.background,
          borderRadius: 1,
          display: "flex",
          border: !channelActive ? 0 : `1px solid ${theme.secondaryColor}`,
          cursor: "pointer",
          margin: 1,
          padding: 1,
        }}
        onClick={toggleChannel}
      >
        <Box mr={1}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h3">
                Boom.Army{" "}
                <VerifiedIcon sx={{ fontSize: "18px", verticalAlign: "sub" }} />
              </Typography>
            </Box>
            <Box>
              {!channelActive ? (
                <Avatar
                  sx={{
                    width: 16,
                    height: 16,
                    background: theme.blueSecondary,
                  }}
                >
                  <AddIcon sx={{ width: 16 }} />
                </Avatar>
              ) : (
                <Avatar
                  sx={{ width: 16, height: 16, background: theme.success }}
                >
                  <CheckIcon sx={{ width: 14 }} />
                </Avatar>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2">Members</Typography>
            </Box>
            <Box>
              <Typography variant="body2">2nSv...A67s</Typography>
            </Box>
          </Box>
        </Box>
      </BoxStyled>
    </>
  );
};

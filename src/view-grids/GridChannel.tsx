import React, { useState } from "react";
import { ChannelFeed } from "../views";
import { Box, Grid, Button, useTheme, Typography } from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import CancelIcon from "@mui/icons-material/Cancel";

export const GridChannel: React.FC = () => {
  const theme = useTheme();
  const [showIframe, setShowIframe] = useState(false);

  const handleClick = () => {
    setShowIframe(!showIframe);
  };

  return (
    <Grid container height="100%">
      <Grid
        item
        md={4}
        display={{ xs: "none", md: "block" }}
        sx={{ background: theme.blue.dark }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100%"
        >
          {!showIframe && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              <VideoChatIcon />
              <Typography ml={1}>Join DAO Chat</Typography>
            </Button>
          )}
          {showIframe && (
            <Button color="primary" onClick={handleClick}>
              <CancelIcon />
              <Typography ml={1}>Quit DAO Chat</Typography>
            </Button>
          )}
          {showIframe && (
            <iframe
              src="https://meet.boom.army/boom"
              title="iframe"
              width="100%"
              height="100%"
              allow="microphone; camera"
            />
          )}
        </Box>
      </Grid>
      <Grid
        item
        sm={12}
        md={5}
        sx={{
          borderRight: `1px solid ${theme.tertiaryColor}`,
          borderLeft: `1px solid ${theme.tertiaryColor}`,
          maxWidth: "100%",
        }}
      >
        <ChannelFeed />
      </Grid>
    </Grid>
  );
};

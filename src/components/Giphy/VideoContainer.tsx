import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Gif {
  id?: string;
  fixedHeightUrl?: string;
  originalUrl?: string;
  title?: string;
  url?: string;
}

interface VideoProps {
  gif: Gif;
  onClose?: (() => void) | undefined;
}

const VideoBoxWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  borderRadius: "16px",
  border: `1px solid ${theme.palette.secondary}`,
  width: "90%",
  margin: "0 0 0.75rem",
  overflow: "hidden",
}));

const Video = styled("video")({
  width: "100%",
  cursor: "auto",
});

export const VideoContainer = React.memo(({ gif, onClose }: VideoProps) => {
  const { fixedHeightUrl, title } = gif;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlayerClick = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }
  };

  return (
    <VideoBoxWrapper>
      {onClose && (
        <Box
          sx={{
            position: "absolute",
            left: "3%",
            top: "3%",
            padding: "5px",
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.7)",
            lineHeight: "1.5",
            fontSize: "14px",
            zIndex: "99",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.57)",
            },
          }}
        >
          <IconButton onClick={onClose} aria-label="close" size="medium">
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Video
        ref={videoRef}
        onClick={handleVideoPlayerClick}
        playsInline
        autoPlay
        muted
        loop
        aria-label={title}
      >
        <source src={fixedHeightUrl} type="video/mp4" />
      </Video>

      <Box
        sx={{
          position: "absolute",
          left: "3%",
          bottom: "3%",
          padding: "0 4px",
          borderRadius: "4px",
          background: "rgba(0, 0, 0, 0.77)",
          lineHeight: "1.5",
          fontSize: "14px",
        }}
      >
        GIF
      </Box>
    </VideoBoxWrapper>
  );
});

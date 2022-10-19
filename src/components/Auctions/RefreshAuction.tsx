import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import RefreshIcon from "@mui/icons-material/Refresh";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import React, { useContext, useEffect, useState } from "react";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; refreshContent: () => void }
) {
  const { theme } = useContext(ThemeContext);

  const ticker = () => {
    const value = 60 - props.value / 1.6666666666666667;
    return value > 0 ? value.toFixed(0) : 0;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 70 }}>
        <Typography
          sx={{ fontSize: "11px" }}
          variant="body2"
          color="text.secondary"
        >
          {ticker() < 57 ? "REFRESH" : "REFRESHING"}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 10 }}>
        <Typography
          sx={{ fontSize: "11px" }}
          variant="body2"
          color="text.secondary"
        >{ticker()}</Typography>
      </Box>
      <Box>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => props.refreshContent()}
        >
          <RefreshIcon fontSize="inherit" sx={{ color: theme.accentColor }} />
        </IconButton>
      </Box>
    </Box>
  );
}

interface RefreshProps {
  fetchAuction: () => Promise<void>;
}

export const Refresh: React.FC<RefreshProps> = ({ fetchAuction }) => {
  const [progress, setProgress] = useState(0);

  const refreshContent = () => {
    fetchAuction();
    setProgress(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress.toFixed() === "100") {
          refreshContent();
        }
        return prevProgress >= 100 ? 0 : prevProgress + 1.6666666666666667;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel
        value={progress}
        refreshContent={refreshContent}
      />
    </Box>
  );
};

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
  props: LinearProgressProps & { value: number, refreshContent: () => void }
) {
  const { theme } = useContext(ThemeContext);

  const ticker = () => {
    const value = 60 - props.value / 1.6666666666666667;
    return value > 1 ? value.toFixed(0) : 0;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 55 }}>
        <Typography variant="body2" color="text.secondary">
          Refresh
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 20 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${ticker()}s`}</Typography>
      </Box>
      <Box>
        <IconButton aria-label="delete" size="small" onClick={() => props.refreshContent()}>
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
    console.log("refreshContent");
    fetchAuction();
    setProgress(0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress >= 100 ? 0 : prevProgress + 1.6666666666666667;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} refreshContent={refreshContent} />
    </Box>
  );
};

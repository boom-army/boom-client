import React, { useContext } from "react";
import { Stack, Typography, useTheme } from "@mui/material";

interface AuctionLabelProps {
  label: string;
  content: any;
}

export const AuctionLabel: React.FC<AuctionLabelProps> = ({
  label,
  content,
}) => {
  const theme = useTheme();
  return (
    <Stack direction={"column"} spacing={0.5} mb={{ xs: 1.5, sm: 0 }}>
      <Typography
        sx={{
          fontSize: 12,
          textTransform: "uppercase",
          color: theme.blue.lighter,
        }}
      >
        {label}
      </Typography>
      {content}
    </Stack>
  );
};

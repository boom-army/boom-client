import React, { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";

interface AuctionLabelProps {
  label: string;
  content: any;
}

export const AuctionLabel: React.FC<AuctionLabelProps> = ({
  label,
  content,
}) => {
  const { theme } = useContext(ThemeContext);
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

import React from "react";
import { boomNumFormat } from "../../utils/utils";
import { Box, Stack, Typography } from "@mui/material";

interface CollectionStatsProps {
    info: any;
}

export const CollectionStats: React.FC<CollectionStatsProps> = ({ info }) => {
  return (
    <Box display="flex" justifyContent="center">
      {info ? (
        <Stack direction="row" spacing={2}>
          <Typography variant="body2">
            Avg ◎:{" "}
            <strong>{boomNumFormat(info.avgPrice24hr).toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Floor ◎:{" "}
            <strong>{boomNumFormat(info.floorPrice).toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Listed: <strong>{info.listedCount}</strong>
          </Typography>
          <Typography variant="body2">
            Volume: <strong>{boomNumFormat(info.volumeAll).toFixed(2)}</strong>
          </Typography>
        </Stack>
      ) : (
        "Loading..."
      )}
    </Box>
  );
};

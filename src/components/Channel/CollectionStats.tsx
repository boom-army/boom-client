import React, { useState, useEffect } from "react";
import { boomNumFormat, formatNumber } from "../../utils/utils";
import { Box, Stack, Typography } from "@mui/material";

export const CollectionStats: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api-mainnet.magiceden.dev/v2/collections/boomheroes/stats",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      {data ? (
        <Stack direction="row" spacing={2}>
          <Typography variant="body2">
            Avg ◎:{" "}
            <strong>{boomNumFormat(data.avgPrice24hr).toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Floor ◎:{" "}
            <strong>{boomNumFormat(data.floorPrice).toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Listed: <strong>{data.listedCount}</strong>
          </Typography>
          <Typography variant="body2">
            Volume:{" "}
            <strong>{boomNumFormat(data.volumeAll).toFixed(2)}</strong>
          </Typography>
        </Stack>
      ) : (
        "Loading..."
      )}
    </Box>
  );
};

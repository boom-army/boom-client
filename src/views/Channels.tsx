import React from "react";
import { Box, Typography } from "@mui/material";
import { ChannelTile } from "../components/Channel/ChannelTile";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { useChannelData } from "../hooks/useChannelData";

export const Channels: React.FC = () => {
  const {
    channelLoading: loading,
    channelError: error,
    channelData: data,
  } = useChannelData();

  if (loading)
    return (
      <Box sx={{ marginTop: "1rem" }}>
        <Loader />
      </Box>
    );
  if (error) return <CustomResponse text={error.message} />;

  return (
    <>
      <Box m={1}>
        <Typography variant="h2" sx={{ fontSize: "18px" }} pb={1}>
          Your NFT DAOs
        </Typography>
      </Box>
      {data && data?.getUserChannels?.length ? (
        data?.getUserChannels?.map((d) => (
          <ChannelTile key={d.id} channel={d} />
        ))
      ) : (
        <CustomResponse text="No channels to display" />
      )}
    </>
  );
};

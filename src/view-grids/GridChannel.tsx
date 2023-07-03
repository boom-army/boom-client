import React, { useEffect, useState } from "react";
import { ChannelFeed } from "../views";
import { Box, Grid, Button, useTheme, Typography } from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSidebarState } from "../hooks";
import {
  useGetChannelQuery,
  useGetCollectionQuery,
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loader } from "../components/Loader";

export const GridChannel: React.FC = () => {
  const theme = useTheme();
  const { sidebar, toggleLeftSidebar, toggleRightSidebar } = useSidebarState();
  const { channelName } = useParams();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [validNFT, setValidNFT] = useState(false);

  const [showIframe, setShowIframe] = useState(false);
  const [viewWidth, setViewWidth] = useState({ utils: 5, chat: 5 });

  const { loading, error, data, fetchMore, refetch } = useGetChannelQuery({
    variables: {
      channelName: channelName as string,
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "network-only",
    pollInterval: 10000,
  });
  const {
    data: { getCollection: collection } = {},
    loading: collectionLoading,
  } = useGetCollectionQuery({
    variables: {
      name: "boomheroes",
    },
  });

  useEffect(() => {
    (async () => {
      if (data) {
        setValidNFT(true);
      }
      if (error?.message) {
        setValidNFT(false);
      }
    })();
  }, [publicKey, connection, data, error]);

  useEffect(() => {
    updateResult();
  }, [sidebar]);

  const updateResult = () => {
    let vWidth;

    switch (true) {
      case (sidebar.leftSidebarFull && !sidebar.rightNotificationsFull) ||
        (!sidebar.leftSidebarFull && sidebar.rightNotificationsFull):
        vWidth = { utils: 6, chat: 6 };
        break;
      case sidebar.leftSidebarFull && sidebar.rightNotificationsFull:
        vWidth = { utils: 6, chat: 6 };
        break;
      default:
        return;
    }

    setViewWidth(vWidth);
  };

  if (loading || collectionLoading)
    return (
      <Box sx={{ marginTop: "1rem" }}>
        <Loader />
      </Box>
    );

  const handleOpen = () => {
    toggleLeftSidebar(false);
    toggleRightSidebar(false);
    setShowIframe(true);
    setViewWidth({ utils: 9, chat: 3 });
  };

  const handleClose = () => {
    setViewWidth({ utils: 5, chat: 5 });
    setShowIframe(false);
  };

  return (
    <Grid container height="100%">
      <Grid
        item
        md={viewWidth.utils}
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
          {!validNFT && (
            <Typography variant="h4" color="white">
              Chat is enable for all #BoomDAO members
            </Typography>
          )}
          {!showIframe && validNFT && (
            <Button variant="contained" color="primary" onClick={handleOpen}>
              <VideoChatIcon />
              <Typography ml={1}>Join DAO Town Hall</Typography>
            </Button>
          )}
          {showIframe && (
            <Button color="primary" onClick={handleClose}>
              <ExitToAppIcon />
              <Typography ml={1}>Leave DAO Town Hall</Typography>
            </Button>
          )}
          {showIframe && validNFT && (
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
        md={viewWidth.chat}
        sx={{
          borderRight: `1px solid ${theme.tertiaryColor}`,
          borderLeft: `1px solid ${theme.tertiaryColor}`,
          maxWidth: "100%",
        }}
      >
        <ChannelFeed
          channelName={channelName}
          collection={collection}
          data={data}
          error={error}
          fetchMore={fetchMore}
          loading={loading}
          refetch={refetch}
          validNFT={validNFT}
        />
      </Grid>
    </Grid>
  );
};

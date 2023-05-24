import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { useEffect } from "react";
import { useMentionsQuery } from "../../generated/graphql";
import { Box, Grid, useTheme } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationLite } from "./NotificationLite";
import { headerOffset } from "../../utils/boom-web3/constants";

export const Notifications = () => {
  const theme = useTheme();
  const { loading, data, fetchMore } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  console.log(data);

  const fetchData = () => {
    fetchMore({
      variables: {
        offset: data?.mentions?.length ?? 0,
      },
    });
  };

  if (loading) return <Loader />;
  return (
    <Box
      id="notificationScroll"
      maxWidth="25rem"
      sx={{
        p: 2,
        borderLeft: `1px solid ${theme.tertiaryColor}`,
        height: headerOffset,
        overflow: "auto",
      }}
    >
      {data?.mentions?.length ? (
        <InfiniteScroll
          dataLength={data?.mentions?.length}
          next={fetchData}
          hasMore={true}
          scrollableTarget="notificationScroll"
          loader={
            loading && (
              <Box sx={{ marginTop: "1rem" }}>
                <Loader />
              </Box>
            )
          }
        >
          {data.mentions.length
            ? data.mentions.map((mention: any) => (
                <NotificationLite key={mention.id} mention={mention} />
              ))
            : null}
        </InfiniteScroll>
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Box>
  );
};

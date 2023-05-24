import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { Notification } from "../components/Notification/Notification";
import { useMentionsQuery } from "../generated/graphql";

export const Notifications = ({ refetchProfile }: any) => {
  const { loading, data, fetchMore } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  useEffect(() => {
    refetchProfile && refetchProfile();
  }, [data, refetchProfile]);

  const fetchData = () => {
    fetchMore({
      variables: {
        offset: data?.mentions?.length ?? 0,
      },
    });
  };

  if (loading) return <Loader />;
  return (
    <Grid item xs={12}>
      {data?.mentions?.length ? (
        <InfiniteScroll
          dataLength={data?.mentions?.length}
          next={fetchData}
          hasMore={true}
          scrollableTarget="scrollBox"
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
                <Notification key={mention.id} mention={mention} />
              ))
            : null}
        </InfiniteScroll>
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Grid>
  );
};

import { CustomResponse } from "./CustomResponse";
import { Loader } from "./Loader";
import { useEffect } from "react";
import { useMentionsQuery } from "../generated/graphql";
import { Box, Grid } from "@mui/material";
import { Notification } from "./Notification/Notification";
import InfiniteScroll from "react-infinite-scroll-component";

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

import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { useEffect } from "react";
import { useMentionsQuery } from "../generated/graphql";
import { Grid } from "@mui/material";
import { Notification } from "../components/Notification/Notification";

export const Notifications = ({ refetchProfile }: any) => {
  const { loading, data } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 15,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetchProfile && refetchProfile();
  }, [data, refetchProfile]);

  if (loading) return <Loader />;
  return (
    <Grid
      item
      xs={12}
    >
      {data?.mentions?.length ? (
        data.mentions.map((mention: any) => (
          <Notification key={mention.id} mention={mention} />
        ))
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Grid>
  );
};

import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { Emoji } from "emoji-mart";
import { useContext, useEffect } from "react";
import { useMentionsQuery } from "../generated/graphql";
import { Box, Grid, Typography } from "@mui/material";
import { UserAvatar } from "../components/UserAvatar";
import { HerofiedIcon } from "../components/Icons";
import { HARKL_ID } from "../utils/utils";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/theme";
import { Notification } from "../components/Notification/Notification";

export const Notifications = ({ refetchProfile }: any) => {
  const { theme } = useContext(ThemeContext);

  const { loading, data } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 15,
    },
    fetchPolicy: "network-only",
  });

  console.log("data", data?.mentions);

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
          <Notification mention={mention} />
        ))
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Grid>
  );
};

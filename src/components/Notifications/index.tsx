import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import { useMentionsQuery } from "../../generated/graphql";
import { Box, useTheme } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationLite } from "./NotificationLite";
import { headerOffset } from "../../utils/boom-web3/constants";
import { useNewMentions } from "../../hooks";

export const Notifications = () => {
  const theme = useTheme();
  const [scrolling, setScrolling] = useState(false);
  const { setNewMentions } = useNewMentions();

  const { loading, data, fetchMore } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const fetchData = (customOffset?: number) => {
    fetchMore({
      variables: {
        offset: customOffset ? customOffset : data?.mentions?.length ?? 0,
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
    };

    document
      .getElementById("notificationScroll")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .getElementById("notificationScroll")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrolling) {
      data?.mentions && fetchData(data?.mentions.length - 10);
      setNewMentions(undefined);
      setScrolling(false);
    }
  }, [scrolling]);

  if (loading) return <Loader />;
  return (
    <Box
      id="notificationScroll"
      maxWidth="25rem"
      minWidth="20rem"
      sx={{
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
        <CustomResponse text="Interact with some people to get some notifications. Make sure your Boom! browser notifications are enabled." />
      )}
    </Box>
  );
};

import InfiniteScroll from "react-infinite-scroll-component";
import React, { useContext } from "react";
import { ApolloError } from "@apollo/client";
import { Box } from "@mui/system";
import { CustomResponse } from "./CustomResponse";
import { Grid, Link } from "@mui/material";
import { HARKL_ID } from "../utils/utils";
import { Loader } from "./Loader";
import { NewTweet } from "./Tweet";
import { NewMeepsCountQuery, Tweet } from "../generated/graphql";
import { BoomHeroStore } from "./Advertising/BoomHeroStore";
import { ThemeContext } from "../contexts/theme";
import { UserContext } from "../contexts/user";
import { TweetThread } from "./Tweet/TweatThread";

interface Props {
  loading?: boolean;
  error?: ApolloError | undefined | any;
  data: Array<Tweet> | undefined;
  newMeeps?: NewMeepsCountQuery["newMeepsCount"] | undefined;
  refetchData?: () => void;
  refetchCount?: () => void;
  fetchMore: (props: any) => void;
}

export const FeedList: React.FC<Props> = ({
  loading,
  error,
  data,
  newMeeps,
  refetchData,
  refetchCount,
  fetchMore,
}) => {
  const { theme } = useContext(ThemeContext);
  const { user: userData } = useContext(UserContext);

  if (loading)
    return (
      <Box sx={{ marginTop: "1rem" }}>
        <Loader />
      </Box>
    );
  if (error) return <CustomResponse text={error.message} />;

  // logout the user if removed from db
  if (data === undefined) {
    localStorage.removeItem("user");
  }

  const fetchData = () => {
    fetchMore({
      variables: {
        offset: data?.length ?? 0,
      },
    });
  };

  const loadNewMeeps = () => {
    refetchData && refetchData();
    refetchCount && refetchCount();
  };

  return (
    <Grid
      container
      id="scrollBox"
      sx={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      {data?.length && loading ? (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      ) : null}
      {userData && <NewTweet key="feedNewTweet" />}
      {newMeeps && newMeeps > 0 ? (
        <Grid item xs={12}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            py={1.5}
            sx={{ backgroundColor: theme.tertiaryColor2 }}
          >
            <Link onClick={loadNewMeeps} sx={{ cursor: "pointer" }}>
              Show {newMeeps} Meep{newMeeps > 1 ? "s" : null}
            </Link>
          </Box>
        </Grid>
      ) : null}
      {data?.length ? (
        <InfiniteScroll
          dataLength={data?.length}
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
          {userData?.data?.avatarUpdateAuthority !== HARKL_ID && (
            <Grid item xs={12}>
              <BoomHeroStore userData={userData} />
            </Grid>
          )}
          {data?.length
            ? data?.map((tweet) => (
                <TweetThread key={tweet.id} tweet={tweet as Tweet} />
              ))
            : null}
        </InfiniteScroll>
      ) : (
        <Grid item xs={12}>
          <CustomResponse text="No hero's have meeped." />
        </Grid>
      )}
    </Grid>
  );
};

import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Grid } from "@mui/material";
import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { useSearchTweetsQuery } from "../generated/graphql";
import { NewsItem } from "../components/NewsItem";

export const News = () => {
  const { data, loading, fetchMore } = useSearchTweetsQuery({
    variables: { term: "#news", type: "TAGS", limit: 20 },
  });

  if (loading)
    return (
      <Box mt={4}>
        <Loader />
      </Box>
    );

  return data?.searchTweets?.length ? (
    <Grid
      container
      id="tweetScroll"
      sx={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={data?.searchTweets?.length}
        next={() =>
          fetchMore({
            variables: {
              offset: data?.searchTweets?.length ?? 0,
            },
          })
        }
        hasMore={true}
        scrollableTarget="tweetScroll"
        loader={
          loading && (
            <Box sx={{ marginTop: "1rem" }}>
              <Loader />
            </Box>
          )
        }
      >
        {data?.searchTweets.map((meep) => <NewsItem meep={meep} />)}
      </InfiniteScroll>
    </Grid>
  ) : (
    <CustomResponse text="No Meeps found in the news feed" />
  );
};

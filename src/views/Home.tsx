import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { FeedList } from "../components/FeedList";
import {
  useFeedQuery,
  Tweet,
  useNewMeepsCountQuery,
} from "../generated/graphql";
import { WordCloud } from "../components/WordCloud";

export const Home: React.FC = () => {
  const {
    loading,
    error,
    data,
    fetchMore,
    refetch: refetchData,
  } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: true,
    },
  });

  const { data: newMeepsCount, refetch: refetchCount } = useNewMeepsCountQuery({
    variables: {
      date: data?.feed[0].createdAt,
    },
  });

  console.log("data", newMeepsCount);

  const cards = [
    { title: "Connected Wallets", value: 3500 },
    { title: "Total Meeps", value: 24000 },
    { title: "Total Tags", value: 1900 },
    { title: "Total Reactions", value: 4533 },
  ];

  const tagData = [
    { value: "hashtag1", count: 200 },
    { value: "hashtag2", count: 150 },
    { value: "hashtag3", count: 120 },
    { value: "hashtag4", count: 100 },
    { value: "hashtag5", count: 80 },
    { value: "hashtag6", count: 70 },
    { value: "hashtag7", count: 50 },
    { value: "hashtag8", count: 40 },
    { value: "hashtag9", count: 30 },
    { value: "hashtag10", count: 20 },
  ];

  return (
    <>
      <Grid
        container
        sx={{
          flexGrow: 1,
          padding: (theme) => theme.spacing(4),
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://placehold.co/400x200"
            alt="image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingLeft: (theme) => theme.spacing(4),
            paddingRight: (theme) => theme.spacing(4),
          }}
        >
          <h2>Some Title Here</h2>
          <p>Some descriptive text here</p>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: (theme) => theme.spacing(2),
            }}
          >
            Call to Action
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Stats
          </Typography>
        </Grid>
        {cards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
            <Card>
              <CardContent>
                <Stack alignItems="center">
                  <Box textAlign="center">
                    <Typography variant="h1" component="div">
                      {card.value}
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="subtitle1" color="text.secondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          Latest Meeps
        </Grid>
        <Grid item xs={12} sm={4}>
          Top NFT Channels
        </Grid>
        <Grid item xs={12} sm={4}>
          Latest News
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WordCloud tagData={tagData} />
        </Grid>
      </Grid>
    </>
  );
};

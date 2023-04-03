import React, { useContext } from "react";
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
  styled,
} from "@mui/material";
import { FeedList } from "../components/FeedList";
import {
  useFeedQuery,
  Tweet,
  useNewMeepsCountQuery,
} from "../generated/graphql";
import { WordCloud } from "../components/WordCloud";
import { ThemeContext } from "../contexts/theme";
import { ThemeVars } from "../styles/themes";

export const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const HomeTitle = styled(Typography)({
    backgroundColor: theme.background2,
    padding: "0.5rem 1rem",
    border: `2px solid ${theme.tertiaryColor2}`,
    borderRadius: "0.2rem",
  });

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
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <HomeTitle variant="h6" sx={{ mt: 2, mb: 1 }}>
            Stats
          </HomeTitle>
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
          <HomeTitle>Latest Meeps</HomeTitle>
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle>Top NFT Channels</HomeTitle>
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle>Latest News</HomeTitle>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomeTitle>Tweet of the week</HomeTitle>
        </Grid>
      </Grid>
      <Box sx={{ backgroundColor: theme.background2, padding: 2 }}>
        <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
          Ready to explore the dungeon?
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Play WhatIsGorgon Now
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <HomeTitle>Tip Leaderboard</HomeTitle>
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle>Top 10 Hashtags</HomeTitle>
          <WordCloud tagData={tagData} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle>Top Meepers</HomeTitle>
        </Grid>
      </Grid>
    </>
  );
};

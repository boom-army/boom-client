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
  useHomeStatsQuery,
  Tag,
} from "../generated/graphql";
import { WordCloud } from "../components/WordCloud";
import { ThemeContext } from "../contexts/theme";
import { ThemeVars } from "../styles/themes";
import dayjs from "dayjs";
import { NewsItem } from "../components/NewsItem";
import { TweetThread } from "../components/Tweet/TweetThread/TweatThread";
import { ChannelTile } from "../components/Channel/ChannelTile";
import { TipRank } from "../components/SideBar/TipRank";
import { TopMeepers } from "../components/TopMeepers";
import { HomeTitle } from "../components/HomeTitle";

export const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const prevMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const { data, loading, error } = useHomeStatsQuery({
    variables: {
      dateFrom: prevMonth,
      term: "#news",
      type: "TAGS",
      limit: 5,
      offset: 0,
      global: true,
      tagLimit: 20,
    },
  });

  const TriBox = styled(Box)({
    maxHeight: "370px",
    overflow: "auto",
  });

  const cards = [
    { title: "Connected Wallets", value: data?.homeStats.wallets },
    { title: "Total Meeps", value: data?.homeStats.meeps },
    { title: "NFT Channels", value: data?.homeStats.channels },
    { title: "Total Reactions", value: data?.homeStats.reactions },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <HomeTitle title="Boom! Stats" sx={{ mt: 2, mb: 1 }} />
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
                    <Typography
                      variant="subtitle1"
                      sx={{ color: theme.secondaryColor, fontWeight: 300 }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4}>
          <HomeTitle title="Latest Meeps" titleLink="/feed" />
          <TriBox>
            {data?.feed.length
              ? data?.feed.map((tweet) => (
                  <TweetThread key={tweet.id} tweet={tweet as Tweet} />
                ))
              : null}
          </TriBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle title="Top NFT Channels" titleLink="/channels" />
          <TriBox>
            {data?.channels?.map((d) => (
              <ChannelTile key={d.id} channel={d} />
            ))}
          </TriBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle title="Latest News" titleLink="/news" />
          <TriBox>
            {data?.news.map((meep) => (
              <NewsItem meep={meep} key={meep.id} />
            ))}
          </TriBox>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomeTitle>Tweet of the week</HomeTitle>
          <Typography>{dummyText}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ backgroundColor: theme.background2, padding: 2 }}>
        <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
          Ready to explore the dungeon?
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Play WhatIsGorgon Now
        </Button>
      </Box> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <HomeTitle title="Tip Leaderboard" titleLink="/leaderboard" />
          <TipRank />
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle title="Trending" />
          <WordCloud tagData={data?.tags?.tags as Tag[]} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <HomeTitle title="Top Meepers" />
          <TopMeepers meepers={data?.meepers.meepers} />
        </Grid>
      </Grid>
    </>
  );
};

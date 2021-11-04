import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Follow } from "../Profile/Follow";

export const ConsumerCard = ({ consumer }) => {
  console.log(consumer);
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardMedia
        component="img"
        height="80"
        image={
          consumer.coverPhoto
            ? consumer.coverPhoto
            : `${window.location.origin}/default-cover.png`
        }
        alt={`${consumer.handle} cover photo`}
      />
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <Avatar
            alt={`${consumer.handle} cover photo`}
            src={consumer.avatar}
          />
          <Stack>
            <Typography
              variant="body"
              component="div"
              sx={{ marginTop: -0.7 }}
            >
              {consumer.consumerName}
            </Typography>
            <Typography
              variant="body2"
              component="div"
            >
              @{consumer.handle}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body2">{consumer.bio}</Typography>
      </CardContent>
      <CardActions>
        <Follow
          sm
          id={consumer.id}
          isFollowing={consumer.isFollowing}
        />
      </CardActions>
    </Card>
  );
};

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
import PersonIcon from "@mui/icons-material/Person";

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
          <Typography gutterBottom variant="body" component="div" sx={{ paddingTop: 1 }}>
            {consumer.consumerName}
          </Typography>
        </Stack>
        <Typography variant="body2">{consumer.bio}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" sx={{ alignSelf: 'flex-end' }}>
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};

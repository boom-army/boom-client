import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const ConsumerCard = ({ consumer }) => {
  console.log(consumer);
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardMedia
        component="img"
        height="80"
        image={consumer.coverPhoto ? consumer.coverPhoto : `${window.location.origin}/default-cover.png`}
        alt={`${consumer.handle} cover photo`}
      />
      <CardContent>
        <CardMedia
          sx={{ borderRadius: 40, height: 40, width: 40}}
          component="img"
          width="80"
          image={consumer.avatar ? consumer.avatar : `${window.location.origin}/default-cover.png`}
          alt={`${consumer.handle} cover avatar`}
        />
        <Typography gutterBottom variant="body" component="div">{consumer.consumerName}</Typography>
        <Typography variant="body2">{consumer.bio}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};

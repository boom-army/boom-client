import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export const ConsumerCard = ({ consumer }) => {
  console.log(consumer);
  return (
    <Wrapper>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="80"
            image={`${window.location.origin}/default-cover.png`}
            alt={`${consumer.handle}-${consumer.coverPhoto}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">{consumer.consumerName}</Typography>
            <Typography variant="body2" color="text.secondary">{consumer.bio}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Follow
          </Button>
        </CardActions>
      </Card>
    </Wrapper>
  );
};

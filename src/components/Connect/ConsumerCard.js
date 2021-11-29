import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Follow } from "../Profile/Follow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const CardStyled = styled(Card)`
  & .MuiButtonBase-root {
    display: block;
  }
`;

export const ConsumerCard = ({ consumer }) => {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(`/${consumer.handle}`);
  return (
    <CardStyled sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea onClick={handleOnClick}>
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
                variant="body1"
                component="div"
                sx={{ marginTop: -0.7 }}
              >
                {consumer.consumerName}
              </Typography>
              <Typography variant="body2" component="div">
                @{consumer.handle}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="body2">{consumer.bio}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Follow sm id={consumer.id} isFollowing={consumer.isFollowing} />
      </CardActions>
    </CardStyled>
  );
};

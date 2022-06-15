import React from "react";
import {
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
import { UserAvatar } from "../UserAvatar";
import { ProfileQuery } from "../../generated/graphql";

const CardStyled = styled(Card)({
  "& .MuiButtonBase-root": {
    display: "block",
  },
});
const TypographyStyled = styled(Typography)<{
  nowrap?: any;
  sx?: any;
  component?: any;
  props?: any;
}>((props) => ({}));

export const ConsumerCard = ({ profile }: ProfileQuery) => {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(`/${profile.handle}`);
  return (
    <CardStyled sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          component="img"
          height="80"
          image={
            profile.coverPhoto
              ? profile.coverPhoto
              : '/assets/default-cover.png'
          }
          alt={`${profile.handle} cover photo`}
        />
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
            <UserAvatar
              sx={{
                width: 30,
                height: 30,
              }}
              avatar={profile?.avatar}
              isNFT={profile?.data?.avatarIsNFT ?? false}
            />
            <Stack>
              <TypographyStyled
                variant="body1"
                component="div"
                nowrap={true && "true"}
                sx={{ marginTop: -0.7 }}
              >
                {profile.consumerName}
              </TypographyStyled>
              <TypographyStyled
                nowrap={true && "true"}
                variant="body2"
                component="div"
              >
                @{profile.handle}
              </TypographyStyled>
            </Stack>
          </Stack>
          <Typography variant="body2">{profile.bio}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Follow sm id={profile.id} isFollowing={profile.isFollowing} />
      </CardActions>
    </CardStyled>
  );
};

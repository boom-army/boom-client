import React from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../UserAvatar";
import { Button, Box, Grid } from "@mui/material";
import { Follow } from "./Follow";
import { DobIcon, LocationIcon, LinkIcon } from "../Icons";
import { styled } from "@mui/material/styles";
import { RoutePath } from "../../constants";

const ProfileInfo = ({ profile }: any) => {
  const {
    id,
    coverPhoto,
    avatar,
    bio,
    location,
    website,
    isSelf,
    dob,
    isFollowing,
    followersCount,
    followingCount,
    handle,
    consumerName,
    publicAddress,
    data,
  } = profile;

  return (
    <Grid item>
      <Box
        position="relative"
        mb={2}
        sx={{
          width: "100%",
          height: "200px",
          backgroundImage: `url("${coverPhoto}")`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "45%",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "0.5em",
            left: "0.5em",
          }}
        >
          <UserAvatar
            avatar={avatar}
            handle={data?.handle}
            isNFT={data?.avatarMint}
          />
        </Box>
      </Box>
      <Box pl={3}>
        <Box>
          {isSelf ? (
            <Button
              component={Link}
              to={`/${RoutePath.PROFILE_SETTINGS}`}
              variant="outlined"
              color="primary"
              size="small"
            >
              Edit Profile
            </Button>
          ) : (
            <Follow isFollowing={isFollowing} id={id} />
          )}
        </Box>
        <Box mt={1} display={"inline-flex"}>
          <div className="profile-name-handle">
            <span className="consumerName">{consumerName}</span>
            <br />
            <span className="wallet">
              <strong>wallet: </strong>
              {publicAddress}
            </span>
            <br />
            <span className="handle">{`@${handle}`}</span>
          </div>
        </Box>
        <Box pb={1}>
          <p className="bio">{bio}</p>
          {!location && !website && !dob ? null : (
            <div className="loc-dob-web">
              {location ? (
                <span>
                  <LocationIcon /> {location}
                </span>
              ) : null}

              {website ? (
                <span>
                  <LinkIcon /> {website}
                </span>
              ) : null}

              {dob ? (
                <span>
                  <DobIcon />
                  {dob}
                </span>
              ) : null}
            </div>
          )}

          <div className="follow-following">
            <span>
              {followersCount ? `${followersCount} followers` : "No followers"}
            </span>
            <span>
              {followingCount
                ? `${followingCount} following`
                : "Not following anyone"}
            </span>
          </div>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileInfo;

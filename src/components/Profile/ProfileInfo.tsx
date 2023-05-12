import React from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../UserAvatar";
import { Button, Box } from "@mui/material";
import { Follow } from "./Follow";
import { DobIcon, LocationIcon, LinkIcon } from "../Icons";
import { styled } from "@mui/material/styles";
import { RoutePath } from "../../constants";

const Wrapper = styled("div")((props) => ({
  borderBottom: `1px solid ${props.theme.tertiaryColor}`,

  ".avatar": {
    marginLeft: "1.4rem",
    marginTop: "-4rem",
  },

  ".profile-name-handle": {
    wordBreak: "break-all",

    "span.consumerName": {
      fontWeight: "bold",
    },

    "span.wallet": {
      marginTop: "0.1rem",
      color: props.theme.secondaryColor,
    },

    "span.handle": {
      marginTop: "0.1rem",
      color: props.theme.secondaryColor,
    },
  },

  ".profile-info": {
    padding: "0 1.4rem 1rem",

    ".bio": {
      width: "100%",
    },
  },

  "div.loc-dob-web": {
    display: "flex",
    color: props.theme.secondaryColor,
    margin: "0.6rem 0",

    span: {
      marginRight: "1.5rem",
    },

    svg: {
      marginRight: "0.2rem",
      position: "relative",
      top: "3px",
    },
  },

  "div.follow-following": {
    color: props.theme.secondaryColor,
    span: {
      marginRight: "1.3rem",
    },
  },
}));

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
    <Wrapper>
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
          <UserAvatar avatar={avatar} isNFT={data?.avatarMint} />
        </Box>
      </Box>
      <Box pl={3}>
        <Box>
          {isSelf ? (
            <Button
              component={Link}
              to={RoutePath.PROFILE_SETTINGS}
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
    </Wrapper>
  );
};

export default ProfileInfo;

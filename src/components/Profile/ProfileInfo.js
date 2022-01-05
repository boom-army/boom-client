import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CoverPhoto from "../../styles/CoverPhoto";
import UserAvatar from "../UserAvatar";
import { Button, Box, Grid } from "@mui/material";
import { Follow } from "./Follow";
import { DobIcon, LocationIcon, LinkIcon } from "../Icons";

const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  position: relative;

  .row {
    padding-bottom: 1rem;
  }

  .avatar {
    margin-left: 1.4rem;
    margin-top: -4rem;
  }

  .profile-name-handle {
    margin-left: 1.4rem;

    span.consumerName {
      font-weight: bold;
    }

    span.wallet {
      margin-top: 0.1rem;
      color: ${(props) => props.theme.secondaryColor};
    }

    span.handle {
      margin-top: 0.1rem;
      color: ${(props) => props.theme.secondaryColor};
    }
  }

  .profile-info {
    padding: 0 1.4rem 1rem;

    .bio {
      width: 90%;
    }
  }

  .action-btn {
    position: absolute;
    right: 1rem;
  }

  div.loc-dob-web {
    display: flex;
    color: ${(props) => props.theme.secondaryColor};
    margin: 0.6rem 0;

    span {
      margin-right: 1.5rem;
    }

    svg {
      margin-right: 0.2rem;
      position: relative;
      top: 3px;
    }
  }

  div.follow-following {
    color: ${(props) => props.theme.secondaryColor};
    span {
      margin-right: 1.3rem;
    }
  }

  @media screen and (max-width: 530px) {
    div.loc-dob-web {
      display: flex;
      flex-direction: column;

      span {
        margin-bottom: 0.7rem;
      }
    }
  }
`;

const ProfileInfo = ({ profile }) => {
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
  } = profile;

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        className="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CoverPhoto src={coverPhoto} alt="cover" />
        <UserAvatar avatar={avatar} />
      </Grid>

      <Grid container direction="row" className="row" alignItems="flex-start">
        {isSelf ? (
          <Box pl={3}>
            <Button
              component={Link}
              to="/settings/profile"
              variant="outlined"
              color="primary"
              size="small"
            >
              Edit Profile
            </Button>
          </Box>
        ) : (
          <Box p={2} pl={4}>
            <Follow isFollowing={isFollowing} id={id} />
          </Box>
        )}
      </Grid>
      <Grid container direction="row" className="row" alignItems="flex-start">
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
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        className="profile-info"
      >
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
      </Grid>
    </Wrapper>
  );
};

export default ProfileInfo;

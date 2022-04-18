import React from "react";
import { Link } from "react-router-dom";
import CoverPhoto from "../../styles/CoverPhoto";
import UserAvatar from "../UserAvatar";
import { Button, Box, Grid } from "@mui/material";
import { Follow } from "./Follow";
import { DobIcon, LocationIcon, LinkIcon } from "../Icons";
import { styled } from "@mui/material/styles";
import { relative } from "path/win32";

const Wrapper = styled("div")((props) => ({
  // borderBottom: `1px solid ${props.theme.tertiaryColor}`,

  ".avatar": {
    // marginLeft: "1.4rem",
    // marginTop: "-4rem",
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
      color: "#4d97cb",
      borderBottom: "1px solid #4d97cb",
      textTransform: "capitalize",
      padding: "0 0 3px 0",
    },
  },
  ".wallet-topbar": {
    backgroundColor: "#4d97cb",
    color: "#0e1b25",
    padding: "7px",
    fontSize: "13px",
    ".wallet": {
      display: "flex",
      justifyContent: "space-between",
      svg: {
        verticalAlign: "middle",
        marginRight: "5px",
      },
      ".copyIcon": {
        svg: {
          marginLeft: "10px",
        },
      },
    },
  },
  ".userimage-section": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "1.4rem",
  },
  ".profile-Button": {
    borderRadius: "25px",
    padding: "4px 5px",
    fontSize: "12px",
    color: "#4d97cb",
    borderColor: "#4d97cb",
    textTransform: "capitalize",
  },
  ".userImg": {
    position: "relative",
    ".userChipBdr": {
      backgroundColor: "#315981",
      display: "flex",
      flexShrink: "0",
      height: "calc(40px + 8px)",
      width: "calc(40px + 8px)",
      clipPath:
        "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
    },
    ".MuiAvatar-root": {
      width: "calc(25px + 19px)",
      height: "calc(25px + 19px)",
      position: "relative",
      top: "2px",
      left: "2px",
      clipPath:
        "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);",
      borderRadius: "0px",
      img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    ".tokenImg": {
      img: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        position: "absolute",
        right: "0",
        bottom: "-6px",
        border: "3px solid #15202b",
      },
    },
  },
  ".bio": {
    color: props.theme.secondaryColor,
  },

  "@media screen and (max-width: 767px)": {
    ".wallet-topbar": {
      whiteSpace: "nowrap",
      ".wallet": {
        fontSize: "10px",
      },
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
  } = profile;

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12}>
          <div className="wallet-topbar">
            <span className="wallet">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="18px"
                  height="18px"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M164 144a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm72-48v104a20.1 20.1 0 0 1-20 20H56a28.1 28.1 0 0 1-28-28V68.2A32.1 32.1 0 0 1 60 36h132a12 12 0 0 1 0 24H60a8.4 8.4 0 0 0-5.8 2.4A8.2 8.2 0 0 0 52 68v.2a8.4 8.4 0 0 0 8.5 7.8H216a20.1 20.1 0 0 1 20 20Zm-24 4H60.5a33.5 33.5 0 0 1-8.5-1.1V192a4 4 0 0 0 4 4h156Z"
                  />
                </svg>

                {publicAddress}
              </span>

              <span className="copyIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="15px"
                  height="15px"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#316081"
                    d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
                  />
                </svg>
              </span>
            </span>
          </div>
        </Grid>
      </Grid>
      <Grid container pt={2}>
        <Grid item xs={8}>
          <div className="userimage-section">
            <span className="userImg">
              <span className="userChipBdr">
                <UserAvatar avatar={avatar} />
              </span>
              <span className="tokenImg">
                <img alt="cover" src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png" />
              </span>
            </span>
            <div className="profile-name-handle">
              <span className="consumerName">{consumerName}</span>
              <br />
              <span className="handle">{`@${handle}`}</span>
            </div>
          </div>
        </Grid>

        <Grid item xs={4} pr={3} sx={{ textAlign: "right" }}>
          {isSelf ? (
            <Button
              className="profile-Button"
              component={Link}
              to="/settings/profile"
              variant="outlined"
              color="primary"
              size="small"
            >
              Edit Profile
            </Button>
          ) : (
            <Follow isFollowing={isFollowing} id={id} />
          )}
        </Grid>
      </Grid>
      {/* <Box mb={3}>
        <CoverPhoto src={coverPhoto} alt="cover" />
        <UserAvatar avatar={avatar} />
      </Box> */}
      <Box pl={3}>
        {/* <Box>
          {isSelf ? (
            <Button
              component={Link}
              to="/settings/profile"
              variant="outlined"
              color="primary"
              size="small"
            >
              Edit Profile
            </Button>
          ) : (
            <Follow isFollowing={isFollowing} id={id} />
          )}
        </Box> */}
        <Box mt={1} display={"inline-flex"}>
          <div className="profile-name-handle">
            {/* <span className="consumerName">{consumerName}</span>
            <br /> */}
            {/* <span className="wallet">
              <strong>wallet: </strong>
              {publicAddress}
            </span>
            <br /> */}
            {/* <span className="handle">{`@${handle}`}</span> */}
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

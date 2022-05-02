import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CoverPhoto from "../../styles/CoverPhoto";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import UserAvatar from "../UserAvatar";
import { Button, Box, Grid, Typography } from "@mui/material";
import { Follow } from "./Follow";
import { DobIcon, LocationIcon, LinkIcon } from "../Icons";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "../../contexts/theme";
import { useSnackbar } from "notistack";

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
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
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
          <Box
            sx={{
              backgroundColor: theme.blueLight,
              color: theme.background,
              cursor: "pointer",
              "&:hover": {
                color: theme.tertiaryColor2,
              }
            }}
            onClick={() => {
              navigator.clipboard.writeText(publicAddress);
              enqueueSnackbar(`Solana PublicKey Copied to clipboard`, { variant: "success" });
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ alignItems: "center", padding: "0.5em 1em" }}
            >
              <Box display="inline-flex">
                <AccountBalanceWalletOutlinedIcon />
                <Typography ml={1} fontWeight="600">
                  {publicAddress}
                </Typography>
              </Box>
              <ContentCopyOutlinedIcon fontSize="small" />
            </Box>
          </Box>
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
                <img src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png" />
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

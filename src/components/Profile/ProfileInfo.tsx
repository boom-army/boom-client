import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CoverPhoto from "../../styles/CoverPhoto";
import UserAvatar from "../UserAvatar";
import { Button, Box, Grid, Typography, Badge, Avatar } from "@mui/material";
import { Follow } from "./Follow";
import { DobIcon, LocationIcon, LinkIcon } from "../Icons";
import { styled } from "@mui/material/styles";
import { relative } from "path/win32";
import { ThemeContext } from "../../contexts/theme";
import { useSnackbar } from "notistack";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import PersonIcon from "@mui/icons-material/Person";

const Wrapper = styled("div")((props) => ({
  ".profile-Button": {
    borderRadius: "25px",
    padding: "4px 5px",
    fontSize: "12px",
    color: props.theme.blueLight,
    borderColor: props.theme.blueLight,
    textTransform: "capitalize",
  },
}));

const SmallAvatar = styled(Avatar)((props) => ({
  width: 22,
  height: 22,
  border: "2px solid #15202b",
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
              },
            }}
            onClick={() => {
              navigator.clipboard.writeText(publicAddress);
              enqueueSnackbar(`Solana PublicKey Copied to clipboard`, {
                variant: "success",
              });
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
          <Badge
            sx={{
              paddingLeft: "20px",
            }}
            overlap="rectangular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <SmallAvatar
                alt="Remy Sharp"
                src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png"
              />
            }
          >
            <Box
              sx={{
                backgroundColor: "#315981",
                clipPath:
                  "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
                height: "44px",
                width: "44px",
              }}
            >
              <Avatar
                className="avatar"
                src={avatar}
                sx={{
                  clipPath:
                    "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
                  borderRadius: "0",
                  margin: "2px",
                }}
              >
                {!avatar && <PersonIcon />}
              </Avatar>
            </Box>
          </Badge>

          <Typography
            m={2}
            fontWeight="600"
            sx={{
              paddingLeft: "8px",
            }}
          >
            {consumerName}
            <Typography
              fontWeight="300"
              sx={{
                color: theme.secondaryColor,
              }}
            >
              {`@${handle}`}
            </Typography>
          </Typography>
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
      <Box pl={3}>
        <Box pb={1}>
          <Typography fontWeight="300" sx={{ color: theme.secondaryColor }}>
            {bio}
          </Typography>
          {!location && !website && !dob ? null : (
            <Box
              sx={{
                display: "flex",
                color: theme.secondaryColor,
                margin: "0.6rem 0",
              }}
            >
              {location ? (
                <Box
                  sx={{
                    marginRight: "1.5rem",
                  }}
                >
                  <LocationIcon /> {location}
                </Box>
              ) : null}

              {website ? (
                <Box
                  sx={{
                    marginRight: "1.5rem",
                  }}
                >
                  <LinkIcon /> {website}
                </Box>
              ) : null}

              {dob ? (
                <Box
                  sx={{
                    marginRight: "1.5rem",
                  }}
                >
                  <DobIcon />
                  {dob}
                </Box>
              ) : null}
            </Box>
          )}
          <Box
            sx={{
              color: theme.blueLight,
              textTransform: "capitalize",
            }}
          >
            <Typography
              fontWeight="300"
              display="inline"
              sx={{ borderBottom: `1px solid ${theme.blueLight}` }}
            >
              {followersCount ? `${followersCount} followers` : "No followers"}
            </Typography>
            <Typography
              ml={3}
              fontWeight="300"
              display="inline"
              sx={{ borderBottom: `1px solid ${theme.blueLight}` }}
            >
              {followingCount
                ? `${followingCount} following`
                : "Not following anyone"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default ProfileInfo;

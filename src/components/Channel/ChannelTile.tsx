import React, { useContext } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import LaunchIcon from "@mui/icons-material/Launch";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import { ChannelStatus } from "../../constants";
import { NavLink } from "react-router-dom";
import { ChannelsQuery } from "../../generated/graphql";
import { useTheme } from '@mui/material/styles';
import { shortenAddress } from "../../utils/utils";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

interface Props {
  channel: ChannelsQuery["channels"][0];
}

export const ChannelTile: React.FC<Props> = ({ channel }) => {
  const theme = useTheme();
  const localTheme = localStorage.getItem("theme");
  const active = channel.status === ChannelStatus.ACTIVE;

  const MemberAvatarBox = styled(Box)({
    "& .MuiAvatarGroup-root .MuiAvatar-root": {
      border: 0,
    },
  });

  return (
    <>
      <Box
        component={NavLink}
        sx={{
          backgroundColor: localTheme === 'dark' ? blue[500] : theme.palette.secondary.dark,
          borderRadius: 1,
          display: "flex",
          border: active ? `1px solid ${theme.palette.secondary.main}` : 0,
          cursor: "pointer",
          margin: 1,
          padding: 1,
          "@media screen and (max-width: 530px)": {
            margin: 0,
            marginTop: "1em",
          },
        }}
        to={channel?.id}
      >
        <Box mr={1}>
          <Avatar
            sx={{ width: "60px", height: "60px" }}
            src={channel.image as string}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "22px",
                  padding: "0.2em 0 0.5em",
                }}
              >
                {`${channel.family} - ${channel.name}`}{" "}
                {channel.verified && (
                  <VerifiedIcon
                    fontSize="small"
                    sx={{ verticalAlign: "sub" }}
                  />
                )}
              </Typography>
            </Box>
            <Box>
              <LaunchIcon
                sx={{
                  fontSize: 14,
                  color: blue[100],
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {channel?.membersCount?.count ? (
                <>
                  <MemberAvatarBox display={"inline-flex"} pr={1}>
                    <AvatarGroup max={3}>
                      {channel?.membersCount?.avatars?.map((m) => (
                        <Avatar
                          sx={{ width: 20, height: 20 }}
                          src={m as string}
                        />
                      ))}
                    </AvatarGroup>
                  </MemberAvatarBox>
                  <Box
                    display={"inline-flex"}
                    sx={{
                      verticalAlign: "5px",
                    }}
                  >
                    <Typography variant="body2">
                      {channel?.membersCount?.count <= 1
                        ? `${channel?.membersCount?.count} member`
                        : `${channel?.membersCount?.count} members`}
                    </Typography>
                  </Box>
                </>
              ) : null}
            </Box>
            <Box>
              <Typography variant="body2">
                {channel.mintAuthority
                  ? shortenAddress(channel.mintAuthority)
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import { ChannelStatus } from "../../constants";
import {
  ChannelsDocument,
  ChannelsQuery,
  useAddChannelMutation,
  useChannelUnlinkMutation,
} from "../../generated/graphql";
import { ThemeContext } from "../../contexts/theme";
import { displayError } from "../../utils";
import { gql } from "@apollo/client";
import { shortenAddress } from "../../utils/utils";
import { styled } from "@mui/material/styles";
import { uniqBy } from "lodash";
import { useSnackbar } from "../../contexts/snackbar";

interface Props {
  channel: ChannelsQuery["channels"][0];
}

export const ChannelTile: React.FC<Props> = ({ channel }) => {
  const { theme } = useContext(ThemeContext);
  const [addChannelMutation, { loading }] = useAddChannelMutation();
  const [channelUnlinkMutation] = useChannelUnlinkMutation({
    variables: {
      channelId: channel.id,
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const active = channel.status === ChannelStatus.ACTIVE;

  const toggleChannel = async () => {
    try {
      if (channel.status === ChannelStatus.ACTIVE) {
        await channelUnlinkMutation({
          update: (cache) => {
            cache.writeFragment({
              id: `Channel:${channel.id}`,
              fragment: gql`
                fragment ChannelStatus on Channel {
                  status
                }
              `,
              data: {
                status: null,
              },
            });
          },
        });
      } else {
        await addChannelMutation({
          variables: {
            mintAuthority: channel.mintAuthority,
            name: channel.name,
            family: channel.family,
            description: channel.description,
            image: channel.image,
            status: ChannelStatus.ACTIVE,
            channelParentId: null,
          },
          update: (cache, { data }) => {
            const { channels }: any = cache.readQuery({
              query: ChannelsDocument,
            });
            cache.writeQuery({
              query: ChannelsDocument,
              data: {
                channels: uniqBy([...channels, data?.addChannel], "id"),
              },
            });
          },
        });
      }
    } catch (error) {
      displayError(error, enqueueSnackbar);
    }
  };

  const StyledCircularProgress = styled(CircularProgress)((props: any) => ({
    color: props.theme.accentColor,
  }));

  const BoxStyled = styled(Box)({
    h3: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "22px",
      padding: "0.2em 0 0.5em",
    },
    ".status": {
      width: "14px",
    },
    "& .MuiTypography-body2": {
      fontWeight: 300,
    },
    "@media screen and (max-width: 530px)": {
      margin: 0,
      marginTop: "1em",
    },
  });

  const MemberAvatarBox = styled(Box)({
    "& .MuiAvatarGroup-root .MuiAvatar-root": {
      border: 0,
    },
  });  

  return (
    <>
      <BoxStyled
        sx={{
          backgroundColor: active ? theme.background : theme.bluePrimary,
          borderRadius: 1,
          display: "flex",
          border: active ? `1px solid ${theme.secondaryColor}` : 0,
          cursor: "pointer",
          margin: 1,
          padding: 1,
        }}
        onClick={toggleChannel}
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
              <Typography variant="h3">
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
              {loading && <StyledCircularProgress size={16} />}
              {!loading && active ? (
                <Avatar
                  sx={{ width: 16, height: 16, background: theme.success }}
                >
                  <CheckIcon className="status" />
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    width: 16,
                    height: 16,
                    background: theme.blueSecondary,
                  }}
                >
                  <AddIcon className="status" />
                </Avatar>
              )}
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
      </BoxStyled>
    </>
  );
};

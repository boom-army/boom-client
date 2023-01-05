import { Box, Typography } from "@mui/material";
import { Emoji } from "emoji-mart";
import { HARKL_ID } from "../../utils/utils";
import { HerofiedIcon } from "../Icons";
import { Link } from "react-router-dom";
import { Mention } from "../../generated/graphql";
import { ThemeContext } from "../../contexts/theme";
import { UserAvatar } from "../UserAvatar";
import { useContext } from "react";

interface NotificationProps {
  mention: Mention;
}

export const Notification = ({ mention }: NotificationProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box p={2} sx={{ borderBottom: `1px solid ${theme.tertiaryColor}` }}>
      {mention.user && (
        <Box display={"flex"}>
          <Box mr={0.5} position="relative">
            <Link to={`/${mention.user.handle}`}>
              <UserAvatar
                className="avatar"
                avatar={mention.user?.avatar as string}
                isNFT={mention.user?.data?.avatarMint}
                sx={{
                  width: "1.1rem",
                  height: "1.1rem",
                  marginTop: "0.2rem",
                }}
              />
            </Link>
          </Box>
          <Link to={`/${mention.user}`}>
            <Typography display={"inline"} color={theme.secondaryColor} sx={{ fontWeight: "600", mr: 0.5 }}>
              {mention.user.consumerName}
            </Typography>
            <Typography
              display={"inline"}
              mr={0.5}
              color={theme.secondaryColor}
            >{`@${mention.user.handle}`}</Typography>
            {mention.user?.data?.avatarUpdateAuthority === HARKL_ID && (
              <Typography display={"inline"}>
                <HerofiedIcon
                  sx={{
                    fill: theme.accentColor,
                    width: "1rem",
                    height: "1rem",
                    verticalAlign: "-2px",
                  }}
                />
              </Typography>
            )}
          </Link>
          {mention.type === "reply" && (
            <Typography color={theme.secondaryColor} display={"inline"} pl={0.5}>
              replied to your meep
            </Typography>
          )}
          {mention.type && mention.type.includes("emoji:") && (
            <Box>
              <Typography color={theme.secondaryColor} display={"inline"} px={0.5}>
                reacted{" "}
                <Box
                  display={"inline"}
                  sx={{
                    "& .emoji-mart-emoji": { verticalAlign: "-3px" },
                  }}
                >
                  <Emoji emoji={mention.type.split(":")[1]} size={16} />
                </Box>
              </Typography>
            </Box>
          )}
          {mention.type === "mention" && (
            <Typography color={theme.secondaryColor} display={"inline"} pl={0.5}>
              mentioned you in meep
            </Typography>
          )}
        </Box>
      )}
      {mention.tweet && <Typography pt={0.5}>{mention.tweet.text}</Typography>}
    </Box>
  );
};

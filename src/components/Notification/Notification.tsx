import { Box, Typography } from "@mui/material";
import { Emoji } from "emoji-mart";
import { HARKL_ID } from "../../utils/utils";
import { HerofiedIcon } from "../Icons";
import { Link } from "react-router-dom";
import { Maybe, Mention, Tweet, User } from "../../generated/graphql";
import { ThemeContext } from "../../contexts/theme";
import { UserAvatar } from "../UserAvatar";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { setDate } from "../../utils";
import { ShowTweet } from "../Tweet";

interface NotificationProps {
  mention: Mention;
}

export const Notification = ({ mention }: NotificationProps) => {
  const { theme } = useContext(ThemeContext);
  const [text, setText] = useState('');

  useEffect(() => {
    switch (mention.type) {
      case "mention":
        setText("mentioned you in a meep");
        break;
      case "reply":
        setText("replied to your meep");
        break;
      default:
        break;
    }
  }, [mention]);

  return (
    <Box p={2} sx={{ borderBottom: `1px solid ${theme.tertiaryColor}` }}>
      {mention?.tweet?.user && (
        <Box display={"flex"}>
          <Box mr={0.5} position="relative">
            <Link to={`/${mention?.tweet?.user.handle}`}>
              <UserAvatar
                className="avatar"
                avatar={mention?.tweet?.user?.avatar as string}
                isNFT={mention?.tweet?.user?.data?.avatarMint}
                sx={{
                  width: "1.1rem",
                  height: "1.1rem",
                  marginTop: "0.2rem",
                }}
              />
            </Link>
          </Box>
          <Link to={`/${mention?.tweet?.user.handle}`}>
            <Typography
              display={"inline"}
              variant="body2"
              color={theme.secondaryColor}
              sx={{ fontWeight: "600", mr: 0.5 }}
            >
              {mention?.tweet?.user.consumerName}
            </Typography>
            <Typography
              display={"inline"}
              mr={0.5}
              variant="body2"
              color={theme.secondaryColor}
            >{`@${mention?.tweet?.user.handle}`}</Typography>
            {mention?.tweet?.user?.data?.avatarUpdateAuthority === HARKL_ID && (
              <Typography display={"inline"}>
                <HerofiedIcon
                  sx={{
                    fill: theme.accentColor,
                    width: "0.8rem",
                    height: "0.8rem",
                    verticalAlign: "-2px",
                  }}
                />
              </Typography>
            )}
          </Link>
          {mention.type && mention.type.includes("emoji:") ? (
            <Box>
              <Typography
                variant="body2"
                color={theme.secondaryColor}
                display={"inline"}
                pl={0.5}
              >
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
          ) : (
            <Typography
              variant="body2"
              color={theme.secondaryColor}
              display={"inline"}
              pl={0.5}
              pt={"3px"}
            >
              {text}
            </Typography>
          )}
          <Typography
            variant="body2"
            color={theme.secondaryColor}
            display={"inline"}
            pl={0.5}
            pt={"3px"}
          >
            {moment(setDate(mention.createdAt)).fromNow()}
          </Typography>
        </Box>
      )}
      {mention.tweet && (
        <ShowTweet
          key={mention.id}
          tweet={mention.tweet}
          overideMt={1}
        ></ShowTweet>
      )}
    </Box>
  );
};

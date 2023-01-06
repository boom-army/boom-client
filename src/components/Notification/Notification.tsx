import { Box, Typography } from "@mui/material";
import { Emoji } from "emoji-mart";
import { HARKL_ID } from "../../utils/utils";
import { HerofiedIcon } from "../Icons";
import { Link } from "react-router-dom";
import { Mention, useProfileByIdQuery, User } from "../../generated/graphql";
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
  const [fromUser, setFromUser] = useState(mention?.tweet?.user);

  useProfileByIdQuery({
    variables: {
      id: mention?.common?.emojiUserId ?? "",
    },
    onCompleted: ({profileById}) => {
      setFromUser(profileById as User);
    }
  });

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
      {fromUser && (
        <Box display={"flex"}>
          <Box mr={0.5} position="relative">
            <Link to={`/${fromUser.handle}`}>
              <UserAvatar
                className="avatar"
                avatar={fromUser?.avatar as string}
                isNFT={fromUser?.data?.avatarMint}
                sx={{
                  width: "1.1rem",
                  height: "1.1rem",
                  marginTop: "0.2rem",
                }}
              />
            </Link>
          </Box>
          <Link to={`/${fromUser.handle}`}>
            <Typography
              display={"inline"}
              variant="body2"
              color={theme.secondaryColor}
              sx={{ fontWeight: "600", mr: 0.5 }}
            >
              {fromUser.consumerName}
            </Typography>
            <Typography
              display={"inline"}
              mr={0.5}
              variant="body2"
              color={theme.secondaryColor}
            >{`@${fromUser.handle}`}</Typography>
            {fromUser?.data?.avatarUpdateAuthority === HARKL_ID && (
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
          {mention.type && mention.type.includes("emoji") ? (
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
                  {mention?.common?.emoji && <Emoji emoji={mention?.common?.emoji} size={16} />}
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

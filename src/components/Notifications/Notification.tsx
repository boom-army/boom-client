import { Box, Typography, useTheme } from "@mui/material";
import { Emoji } from "emoji-mart";
import { HARKL_ID } from "../../utils/utils";
import { HerofiedIcon } from "../Icons";
import { Link } from "react-router-dom";
import { Mention, useProfileByIdQuery, User } from "../../generated/graphql";
import { UserAvatar } from "../UserAvatar";
import { useEffect, useState } from "react";
import { setDate } from "../../utils";
import { ShowTweet } from "../Tweet";
import { RoutePath } from "../../constants";
import dayjs from "dayjs";

interface NotificationProps {
  mention: Mention;
}

export const Notification = ({ mention }: NotificationProps) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [fromUser, setFromUser] = useState(mention?.tweet?.user);

  useProfileByIdQuery({
    variables: {
      id: mention?.common?.emojiUserId ?? "",
    },
    onCompleted: ({ profileById }) => {
      setFromUser(profileById as User);
    },
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
        <Box
          display={"flex"}
          sx={{ flexWrap: "wrap", wordBreak: "break-word" }}
        >
          <Box mr={0.5} position="relative">
            <Link to={`${RoutePath.HANDLE_HASH}/${fromUser.handle}`}>
              <UserAvatar
                className="avatar"
                avatar={fromUser?.avatar as string}
                handle={fromUser?.handle}
                isNFT={fromUser?.data?.avatarMint}
                sx={{
                  width: "1.1rem",
                  height: "1.1rem",
                  mt: "0.1rem",
                }}
              />
            </Link>
          </Box>
          <Typography
            variant="body2"
            color="secondary"
            sx={{ fontWeight: "600", mr: 0.5 }}
          >
            {fromUser.consumerName}
          </Typography>
          <Typography
            mr={0.5}
            variant="body2"
            color="secondary"
          >{`@${fromUser.handle}`}</Typography>
          {fromUser?.data?.avatarUpdateAuthority === HARKL_ID && (
            <HerofiedIcon
              sx={{
                fill: theme.accentColor,
                width: "0.8rem",
                height: "0.8rem",
                verticalAlign: "1px",
              }}
            />
          )}
          {mention.type && mention.type.includes("emoji") ? (
            <Box>
              <Typography variant="body2" color="secondary" pl={0.5}>
                reacted{" "}
                <Box
                  display={"inline"}
                  sx={{
                    "& .emoji-mart-emoji": { verticalAlign: "-3px" },
                  }}
                >
                  {mention?.common?.emojiId && (
                    <Emoji emoji={mention?.common?.emojiId} size={14} />
                  )}
                </Box>
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="secondary" pl={0.5}>
              {text}
            </Typography>
          )}
          <Typography variant="body2" color="secondary" pl={0.5}>
            {dayjs(setDate(mention.createdAt)).fromNow()}
          </Typography>
        </Box>
      )}
      {mention.tweet && (
        <ShowTweet
          key={mention.id}
          tweet={mention.tweet}
          overideMt={0.5}
        ></ShowTweet>
      )}
    </Box>
  );
};

import { Box, Stack, Typography, useTheme, alpha } from "@mui/material";
import { Emoji } from "emoji-mart";
import { HARKL_ID } from "../../utils/utils";
import { HerofiedIcon } from "../Icons";
import { Link } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { Mention, useProfileByIdQuery, User } from "../../generated/graphql";
import { MentionTypes, RoutePath } from "../../constants";
import { ShowTweet } from "../Tweet";
import { ThreadReply } from "../Tweet/TweetThread/ThreadReply";
import { UserAvatar } from "../UserAvatar";
import { useEffect, useState } from "react";
import { useNewMentions } from "../../hooks";

interface NotificationProps {
  mention: Mention;
}

export const NotificationLite = ({ mention }: NotificationProps) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [fromUser, setFromUser] = useState(mention?.tweet?.user);
  const { newMentions } = useNewMentions();

  const mentionIsNew =
    newMentions?.length &&
    newMentions?.some((newMention) => newMention.id === mention.id);

  useProfileByIdQuery({
    variables: {
      id:
        (mention?.common?.emojiUserId || mention?.common?.mentionUserId) ?? "",
    },
    onCompleted: ({ profileById }) => {
      setFromUser(profileById as User);
    },
  });

  useEffect(() => {
    switch (mention.type) {
      case MentionTypes.MENTION:
        setText("Mention in");
        break;
      case MentionTypes.REPLY:
        setText("Replied in");
        break;
      default:
        break;
    }
  }, [mention]);

  return (
    <Stack
      direction="column"
      p={2}
      sx={{
        borderBottom: `1px solid ${theme.tertiaryColor}`,
        backgroundColor: mentionIsNew
          ? alpha(theme.accentColor, 0.1)
          : "transparent",
      }}
    >
      {mention.type === MentionTypes.REPLY && (
        <Box>
          <Box display="flex" alignItems="center">
            <ReplyIcon sx={{ color: theme.accentColor }} fontSize="small" />
            <Typography variant="body2" color="secondary">
              {text}{" "}
              {mention.tweet?.channel ? `${mention.tweet?.channel}` : "Feed"}
            </Typography>
          </Box>
          <Box pb={1.5}>
            <ThreadReply tweet={mention.tweet?.parentTweet} />
          </Box>
        </Box>
      )}
      {mention.type === MentionTypes.EMOJI && (
        <Box display="flex">
          {mention?.common?.emojiId && (
            <Box mr={1}>
              <Emoji emoji={mention?.common?.emojiId} size={20} />
            </Box>
          )}
          {mention.user && (
            <Box display={"flex"}>
              <Box mr={0.5} position="relative">
                <Link to={`/${RoutePath.HANDLE_HASH}/${mention.user.handle}`}>
                  <UserAvatar
                    className="avatar"
                    avatar={mention.user?.avatar as string}
                    handle={mention.user?.handle}
                    isNFT={mention.user?.data?.avatarMint}
                    sx={{
                      width: "1.1rem",
                      height: "1.1rem",
                      mt: "0.1rem",
                    }}
                  />
                </Link>
              </Box>
              <Typography
                mr={0.5}
                variant="body2"
                color="secondary"
              >{`@${mention.user.handle}`}</Typography>
              {mention.user?.data?.avatarUpdateAuthority === HARKL_ID && (
                <HerofiedIcon
                  sx={{
                    fill: theme.accentColor,
                    width: "0.8rem",
                    height: "0.8rem",
                    verticalAlign: "1px",
                  }}
                />
              )}
            </Box>
          )}
        </Box>
      )}
      {mention.tweet && (
        <ShowTweet key={mention.id} tweet={mention.tweet} overideMt={0.5} />
      )}
    </Stack>
  );
};

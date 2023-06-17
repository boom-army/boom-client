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
  const mentionUserId =
    mention?.common?.emojiUserId || mention?.common?.mentionUserId;

  if (mentionUserId) {
    useProfileByIdQuery({
      variables: {
        id: mentionUserId,
      },
      onCompleted: ({ profileById }) => {
        setFromUser(profileById as User);
      },
    });
  }

  useEffect(() => {
    switch (mention.type) {
      case MentionTypes.MENTION:
        setText("Mention in");
        break;
      case MentionTypes.REPLY:
        setText("Replied in");
        break;
      case MentionTypes.EMOJI:
        setText("reacted");
        break;
      default:
        break;
    }
  }, [mention]);

  const ChannelInfo = ({ mention }: { mention: Mention }) => (
    <Box display="flex" alignItems="center">
      <ReplyIcon sx={{ color: theme.accentColor }} fontSize="small" />
      <Typography variant="body2" color="secondary">
        {text}
      </Typography>
      {mention.tweet?.channel ? (
        <Link
          to={`/${RoutePath.DAO}/${mention.tweet?.channel?.key}`}
          style={{
            color: theme.accentColor,
            fontSize: "0.9rem",
            fontWeight: 300,
            marginLeft: "0.3rem",
          }}
        >
          {mention.tweet?.channel?.family} - {mention.tweet?.channel?.name}
        </Link>
      ) : (
        <Link
          to={`/${RoutePath.FEED}`}
          style={{
            color: theme.accentColor,
            fontSize: "0.9rem",
            fontWeight: 300,
            marginLeft: "0.3rem",
          }}
        >
          Feed
        </Link>
      )}
    </Box>
  );

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
      {(mention.type === MentionTypes.MENTION ||
        mention.type === MentionTypes.REPLY) && (
        <Box>
          {(mention.tweet?.parentTweet || mention.tweet?.channel) && (
            <Box>
              <ChannelInfo mention={mention} />
              <Box pb={1.5}>
                <ThreadReply tweet={mention.tweet} fromUser={fromUser} />
              </Box>
            </Box>
          )}
          {mention.tweet && (
            <ShowTweet key={mention.id} tweet={mention.tweet} overideMt={0.5} />
          )}
        </Box>
      )}
      {mention.type === MentionTypes.EMOJI && (
        <div>
          <Box display="flex">
            {fromUser && (
              <Box display={"flex"}>
                <Box mr={0.5} position="relative">
                  <Link to={`/${RoutePath.HANDLE_HASH}/${fromUser.handle}`}>
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
                      marginRight: "0.2rem",
                    }}
                  />
                )}
              </Box>
            )}
            <Typography variant="body2" color="secondary">
              {text}{" "}
            </Typography>
            {mention?.common?.emojiId && (
              <Box ml={1}>
                <Emoji emoji={mention?.common?.emojiId} size={20} />
              </Box>
            )}
          </Box>
          {mention.tweet && (
            <ShowTweet
              key={mention.id}
              tweet={mention.tweet}
              overideMt={0.5}
              truncated={30}
            />
          )}
        </div>
      )}
    </Stack>
  );
};

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

interface DisplayData {
  fromUser: Maybe<User> | undefined;
  forTweet: Maybe<Tweet> | undefined;
  fromText: string | null;
}

export const Notification = ({ mention }: NotificationProps) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState<DisplayData>({
    fromUser: null,
    forTweet: null,
    fromText: null,
  });

  useEffect(() => {
    switch (mention.type) {
      case "mention":
        setData({
          fromUser: mention.user,
          forTweet: mention.tweet,
          fromText: "mentioned you in a meep",
        });
        break;
      case "reply":
        setData({
          fromUser: mention.user,
          forTweet: mention.tweet,
          fromText: "replied to your meep",
        });
        break;
      default:
        break;
    }
  }, [mention]);

  return data.fromUser && data.forTweet ? (
    <Box p={2} sx={{ borderBottom: `1px solid ${theme.tertiaryColor}` }}>
      {data.fromUser && (
        <Box display={"flex"}>
          <Box mr={0.5} position="relative">
            <Link to={`/${data.fromUser.handle}`}>
              <UserAvatar
                className="avatar"
                avatar={data.fromUser?.avatar as string}
                isNFT={data.fromUser?.data?.avatarMint}
                sx={{
                  width: "1.1rem",
                  height: "1.1rem",
                  marginTop: "0.2rem",
                }}
              />
            </Link>
          </Box>
          <Link to={`/${data.fromUser.handle}`}>
            <Typography
              display={"inline"}
              variant="body2"
              color={theme.secondaryColor}
              sx={{ fontWeight: "600", mr: 0.5 }}
            >
              {data.fromUser.consumerName}
            </Typography>
            <Typography
              display={"inline"}
              mr={0.5}
              variant="body2"
              color={theme.secondaryColor}
            >{`@${data.fromUser.handle}`}</Typography>
            {data.fromUser?.data?.avatarUpdateAuthority === HARKL_ID && (
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
              {data.fromText}
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
      {data.forTweet && (
        <ShowTweet
          key={mention.id}
          tweet={data.forTweet}
          overideMt={1}
        ></ShowTweet>
      )}
    </Box>
  ) : null;
};

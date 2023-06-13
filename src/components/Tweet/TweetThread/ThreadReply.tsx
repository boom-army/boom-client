import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { ReplyBox } from "../../Message/ReplyBox";
import { UserAvatar } from "../../UserAvatar";
import { Maybe, Tweet, TweetQuery, User } from "../../../generated/graphql";
import { RoutePath } from "../../../constants";
import { truncate } from "lodash";

interface Props {
  tweet: TweetQuery["tweet"] | Maybe<Tweet> | undefined;
  fromUser?: User | null | undefined;
}

export const ThreadReply: React.FC<Props> = ({ tweet, fromUser }: Props) => {
  const theme = useTheme();
  const masterTweet = tweet?.masterTweet;
  const parentTweet = tweet?.parentTweet;
  const user = parentTweet?.user ?? fromUser;
  return (
    <Box sx={{ position: "relative", top: 15, left: 14, width: "100%" }}>
      <ReplyBox>
        <HashLink
          to={`/${RoutePath.MEEP_HASH}/${masterTweet?.id ?? parentTweet?.id}`}
        >
          <Stack
            pl={5.9}
            pb={1}
            direction="row"
            alignContent="center"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Box
              mr={0.5}
              display="flex"
              alignItems="top"
              pt={0.8}
            >
              <UserAvatar
                sx={{
                  width: 16,
                  height: 16,
                }}
                avatar={user?.avatar}
                handle={user?.handle}
                isNFT={user?.data?.avatarMint}
              />
            </Box>
            <Box>
            <Typography
              color="secondary"
              variant="body2"
              display="inline"
              mr={1}
            >
              @{user?.handle}
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              display="inline"
              sx={{
                fontWeight: "300",
              }}
            >
              {truncate(parentTweet?.text ?? "", { length: 90 })}
            </Typography>
            </Box>
          </Stack>
        </HashLink>
      </ReplyBox>
    </Box>
  );
};

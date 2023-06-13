import React from "react";
import { Box, Stack, Typography } from "@mui/material";
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
  const masterTweet = tweet?.masterTweet;
  const parentTweet = tweet?.parentTweet;
  const user = parentTweet?.user ?? fromUser;  
  return (
    <Box sx={{ position: "relative", top: 17, left: 14, width: "100%" }}>
      <ReplyBox>
        <HashLink
          to={`/${RoutePath.MEEP_HASH}/${masterTweet?.id ?? parentTweet?.id}`}
        >
          <Box pl={5.7} alignContent="center" display="flex" flexWrap="wrap">
            <Box mr={0.5} pt={"2px"} display="inline-flex">
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
            <Box mr={1} display="inline-flex">
              <Typography color="secondary" variant="body2">
                @{user?.handle}
              </Typography>
            </Box>
            <Box
              pr={2}
              sx={{
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              display="inline-flex"
            >
              <Typography
                variant="body2"
                color="secondary"
                sx={{
                  fontWeight: "300",
                }}
              >
                {truncate(parentTweet?.text ?? "", { length: 40 })}
              </Typography>
            </Box>
          </Box>
        </HashLink>
      </ReplyBox>
    </Box>
  );
};

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { ReplyBox } from "../../Message/ReplyBox";
import { UserAvatar } from "../../UserAvatar";
import { TweetQuery } from "../../../generated/graphql";
import { RoutePath } from "../../../constants";

interface Props {
  tweet: TweetQuery["tweet"];
}

export const ThreadReply: React.FC<Props> = ({ tweet }: Props) => {
  const masterTweet = tweet?.masterTweet;
  const parentTweet = tweet?.parentTweet;
  return (
    <Box sx={{ position: "relative", top: 17, left: 14, width: "100%" }}>
      <ReplyBox>
        <HashLink
          to={`${RoutePath.MEEP_HASH}/${masterTweet?.id}`}
        >
          <Stack direction="row" pl={5.7}>
            <Box mr={0.5} pt={"2px"} sx={{ alignItems: "center" }}>
              <UserAvatar
                sx={{
                  width: 16,
                  height: 16,
                }}
                avatar={parentTweet?.user?.avatar}
                handle={parentTweet?.user?.handle}
                isNFT={parentTweet?.user?.data?.avatarMint}
              />
            </Box>
            <Box mr={1}>
              <Typography color="secondary" variant="body2">
                @{parentTweet?.user?.handle}
              </Typography>
            </Box>
            <Box
              pr={2}
              sx={{
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                variant="body2"
                color="secondary"
                sx={{
                  fontWeight: "300",
                }}
              >
                {parentTweet?.text}
              </Typography>
            </Box>
          </Stack>
        </HashLink>
      </ReplyBox>
    </Box>
  );
};

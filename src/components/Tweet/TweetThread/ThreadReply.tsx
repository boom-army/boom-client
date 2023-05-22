import React, { useContext } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { ReplyBox } from "../../Message/ShowMessage";
import { UserAvatar } from "../../UserAvatar";
import { TweetQuery } from "../../../generated/graphql";
import { RoutePath } from "../../../constants";

interface Props {
  tweet: TweetQuery["tweet"]["parentTweet"];
}

export const ThreadReply: React.FC<Props> = ({ tweet }: Props) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", top: 17, left: 14, width: "100%" }}>
      <ReplyBox>
        <HashLink
          to={`${RoutePath.HANDLE_HASH}/${tweet?.user?.handle}/${tweet?.id}`}
        >
          <Stack direction="row" pl={5}>
            <Box mr={0.5} pt={"2px"} sx={{ alignItems: "center" }}>
              <UserAvatar
                sx={{
                  width: 16,
                  height: 16,
                }}
                avatar={tweet?.user?.avatar}
                handle={tweet?.user?.handle}
                isNFT={tweet?.user?.data?.avatarMint}
              />
            </Box>
            <Box mr={1}>
              <Typography color="secondary" variant="body2">
                @{tweet?.user?.handle}
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
                {tweet?.text}
              </Typography>
            </Box>
          </Stack>
        </HashLink>
      </ReplyBox>
    </Box>
  );
};

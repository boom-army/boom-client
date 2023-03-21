import React, { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { ReplyBox } from "../../Message/ShowMessage";
import { UserAvatar } from "../../UserAvatar";
import { TweetQuery } from "../../../generated/graphql";
import { ThemeContext } from "../../../contexts/theme";

interface Props {
  tweet: TweetQuery["tweet"]["parentTweet"];
}

export const ThreadReply: React.FC<Props> = ({ tweet }: Props) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Box sx={{ position: "relative", top: 17, left: 14 }}>
      <ReplyBox>
        <HashLink to={`/`}>
          <Stack direction="row" pl={5}>
            <Box mr={0.5} pt={"2px"} sx={{ alignItems: "center" }}>
              <UserAvatar
                sx={{
                  width: 16,
                  height: 16,
                }}
                avatar={tweet?.user?.avatar as string}
                isNFT={tweet?.user?.data?.avatarMint}
              />
            </Box>
            <Box mr={1}>
              <Typography variant="body2" sx={{ color: theme.secondaryColor }}>
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
                sx={{
                  fontWeight: "300",
                  color: theme.secondaryColor,
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

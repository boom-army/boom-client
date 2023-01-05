import { CustomResponse } from "../components/CustomResponse";
import { Loader } from "../components/Loader";
import { ShowTweet } from "../components/Tweet";
import { Emoji } from "emoji-mart";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useMentionsQuery } from "../generated/graphql";
import { Box, Typography } from "@mui/material";
import { UserAvatar } from "../components/UserAvatar";

const Wrapper = styled("div")({});

export const Notifications = ({ refetchProfile }: any) => {
  const { loading, data } = useMentionsQuery({
    variables: {
      offset: 0,
      limit: 15,
    },
    fetchPolicy: "network-only",
  });

  console.log("data", data);

  useEffect(() => {
    refetchProfile && refetchProfile();
  }, [data, refetchProfile]);
  if (loading) return <Loader />;
  return (
    <Wrapper>
      {data?.mentions?.length ? (
        data.mentions.map((mention: any) => (
          <Box p={1} sx={{ borderBottom: "1px solid black" }}>
            {mention.user && (
              <Box display={"flex"}>
                <UserAvatar
                  sx={{
                    width: 20,
                    height: 20,
                    marginRight: 0.5,
                  }}
                  avatar={mention.user?.avatar}
                  isNFT={mention.user?.data?.avatarMint}
                />
                {mention.user.handle}
                {mention.type === "reply" && " replied to your meep"}
                {mention.type.includes("emoji:") && (
                  <>
                    <Typography display={"inline"} px={0.5}>
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
                  </>
                )}
                {mention.type === "mention" && " mentioned you in meep"}
              </Box>
            )}
            {mention.tweet && mention.tweet.text}
          </Box>
        ))
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};

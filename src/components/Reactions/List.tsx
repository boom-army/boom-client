import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Emoji } from "emoji-mart";
import { Reaction, useTweetReactionsLazyQuery } from "../../generated/graphql";
import { ThemeContext } from "../../contexts/theme";
import { Typography } from "@mui/material";

export interface Accumulator
  extends Record<
    string,
    {
      isMine?: boolean;
      emojiId: string;
      count: number;
    }
  > {}

export type HandleReaction = (Arg: { emojiId: string }) => void;

const createUserReactionTooltip = (
  reactions: Array<Reaction>,
  emojiId: string
) => {
  const users = reactions
    .filter((reaction) => reaction.emojiId === emojiId)
    .map((reaction) => reaction.user)
    .concat();

  return (
    <Stack
      alignItems="flex-start"
      direction="column"
      spacing={1}
      sx={{ m: 0.5 }}
    >
      {users.map(
        (user) =>
          user && (
            <Stack key={user.handle} direction="row" spacing={1}>
              <Avatar
                alt={user.handle}
                src={user.avatar}
                sx={{ width: 20, height: 20 }}
              />
              <span>@{user.handle}</span>
            </Stack>
          )
      )}
    </Stack>
  );
};

const createReactionsList = (reactions: Array<Reaction>) => {
  return Object.values(
    reactions.reduce((acc, { emojiId, isMine }) => {
      if (!acc[emojiId]) acc[emojiId] = { emojiId, count: 0 };
      const reaction = acc[emojiId];
      reaction.isMine = reaction.isMine || isMine;
      reaction.count++;
      return acc;
    }, {} as Accumulator)
  );
};

export const List: React.FC<{
  reactions: Array<Reaction>;
  handleReaction: HandleReaction;
  tweetId: string;
}> = ({ reactions, handleReaction, tweetId }) => {
  const { theme } = useContext(ThemeContext);
  const [getTweetReactions, { data, loading }] = useTweetReactionsLazyQuery({
    variables: { tweetId: tweetId },
  });

  const reactionsWithCount = createReactionsList(reactions);
  const [reactionsWithUsers, setReactionsWithUsers] = useState<
    Array<Reaction> | undefined
  >([]);

  useEffect(() => {
    if (!data?.tweet?.reactions) return;
    setReactionsWithUsers(data?.tweet?.reactions as Array<Reaction>);
  }, [data]);

  return (
    <>
      {reactionsWithCount
        .sort((a, b) => a.emojiId.localeCompare(b.emojiId))
        .map(({ emojiId, count, isMine }) => {
          return (
            <Tooltip
              onOpen={() => getTweetReactions()}
              key={emojiId}
              title={
                reactionsWithUsers && !loading
                  ? createUserReactionTooltip(reactionsWithUsers, emojiId)
                  : ""
              }
            >
              <Button
                onClick={() => handleReaction({ emojiId })}
                startIcon={<Emoji emoji={emojiId} size={16} />}
                style={{
                  padding: "2px 10px 0",
                  borderRadius: "30px",
                  minWidth: "auto",
                  color: theme.secondaryColor,
                  backgroundColor: isMine ? theme.tertiaryColor2 : "inherit",
                  lineHeight: "1.2",
                  margin: "0 0.3em 0.3em 0",
                }}
              >
                {count > 0 && (
                  <Typography sx={{ lineHeight: "1.2" }}>{count}</Typography>
                )}
              </Button>
            </Tooltip>
          );
        })}
    </>
  );
};

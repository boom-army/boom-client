import React from 'react'
import { Reaction, User } from '../../generated/graphql';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Emoji } from "emoji-mart";
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import { Typography } from '@mui/material';

export interface AccumulatorReaction {
  isMine?: boolean,
  emojiId: string,
  count: number,
  users: User[],
};

export interface Accumulator extends Record<string, AccumulatorReaction> { };

export type HandleReaction = ((Arg: { emojiId: string }) => void);

const reactionUsers = (users: User[]) => {
  return users.map(user => (
    <Stack key={user.handle} direction="row" spacing={1}>
      <Avatar alt={user.handle} src={user.avatar} sx={{ width: 20, height: 20 }} />
      <span>@{user.handle}</span>
    </Stack>
  ));
};

const updateReaction = (acc: Accumulator, r: Reaction): Accumulator => {
  const reaction = acc[r.emojiId];
  reaction.isMine = reaction.isMine || r.isMine;
  reaction.count++;
  reaction.users.push(r.user);
  return acc;
};

export const List: React.FC<{ reactions: Array<Reaction>, handleReaction: HandleReaction }> = ({ reactions, handleReaction }) => {
  const reactionsWithUsersAndCount = Object.values(
    reactions.reduce((acc, reaction) => {
      if (acc[reaction.emojiId]) return updateReaction(acc, reaction);

      acc[reaction.emojiId] = {
        users: [],
        emojiId: reaction.emojiId,
        count: 0,
      };

      return updateReaction(acc, reaction);
    }, {} as Accumulator)
  );

  return (
    <Box sx={{ marginBottom: 1.5 }}>
      {
        reactionsWithUsersAndCount
          .sort((a, b) => a.emojiId.localeCompare(b.emojiId))
          .map(({ emojiId, count, users }) => {
            return (
              <Tooltip key={emojiId} title={
                <Stack
                  alignItems="flex-start"
                  direction="column"
                  spacing={1}
                  sx={{ m: 0.5 }}
                >
                  {reactionUsers(users)}
                </Stack>
              }>
                <Button
                  onClick={() => handleReaction({ emojiId })}
                  variant="outlined"
                  startIcon={<Emoji emoji={emojiId} size={16} />}
                  sx={{
                    borderWidth: "2px",
                    padding: '4px 10px!important',
                    minWidth: 'auto!important',
                    marginRight: '8px!important',
                    color: '#657786!important',
                    '& .emoji-mart-emoji': {
                      fontSize: "0!important"
                    }
                  }}
                >
                  {count > 0 && <Typography>{count}</Typography>}
                </Button>
              </Tooltip>
            );
          })
      }
    </Box>
  )
}

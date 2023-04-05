import {
  List,
  ListItem,
  ListItemAvatar,
  Badge,
  ListItemText,
} from "@mui/material";
import React, { FC, useContext } from "react";
import { UserAvatar } from "./UserAvatar";
import { NameCard } from "./UserLabels/NameCard";
import { UserWithMeepCount, Maybe } from "../generated/graphql";
import { awardColorSelect } from "../utils";
import { ThemeContext } from "../contexts/theme";

interface TMProps {
  meepers: any;
}

export const TopMeepers: FC<TMProps> = ({ meepers }) => {
    const { theme } = useContext(ThemeContext);
  return (
    <List>
      {meepers?.map((meeper: any, i) => (
        <ListItem key={meeper?.user?.id} sx={{ padding: 0 }}>
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: awardColorSelect(i),
                  color: awardColorSelect(i),
                  boxShadow: `0 0 0 2px ${theme.background}`,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                },
              }}
            >
              <UserAvatar
                avatar={meeper?.user?.avatar}
                isNFT={meeper?.user?.data?.avatarMint}
                sx={{ width: 38, height: 38, mr: 0.2 }}
              />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={<NameCard user={meeper?.user as any} />}
            secondary={`${meeper?.meepCount} meeps`}
          />
        </ListItem>
      ))}
    </List>
  );
};

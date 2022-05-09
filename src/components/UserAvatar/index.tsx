import React from "react";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { SxProps } from "@mui/material/styles";

interface IProps {
  avatar?: string;
  className?: string;
  sx?: SxProps | undefined;
}

const PersonAvatar = ({ avatar, sx }: IProps) => (
  <Avatar className="avatar" sx={sx} src={avatar}>
    {!avatar && <PersonIcon />}
  </Avatar>
);

export default PersonAvatar;

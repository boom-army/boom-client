import React from "react";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

interface IProps {
  avatar?: string
  className?: string
}

const PersonAvatar = ({avatar}: IProps) => (
  <Avatar className="avatar" src={avatar}>
    {!avatar && <PersonIcon />}
  </Avatar>)

export default PersonAvatar

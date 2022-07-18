import React from "react";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { SxProps, styled } from "@mui/material/styles";

interface IProps {
  avatar?: string;
  className?: string;
  isNFT?: string | null | undefined;
  sx?: SxProps | undefined;
}

const NFTAvatar = styled(Avatar)({
  "--path": "5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%, 50% 0%",
  position: "relative",
  clipPath: "polygon(var(--path))",
  transition: "all 0.2s ease-in",
});

export const UserAvatar = ({ avatar, isNFT = '', sx }: IProps) => {
  return (
    isNFT && isNFT.length > 0 ? (
      <NFTAvatar className={`avatar`} sx={sx} src={avatar}>
        {!avatar && <PersonIcon />}
      </NFTAvatar>
    ) : (
      <Avatar className={`avatar`} sx={sx} src={avatar}>
        {!avatar && <PersonIcon />}
      </Avatar>
    )
  );
};

import { Avatar, SxProps, styled, useTheme } from "@mui/material";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";
import { useEffect, useState } from "react";

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

const uniqueString = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${randomString}`;
};

export const UserAvatar = ({ avatar, isNFT = "", sx }: IProps) => {
  const theme = useTheme();
  const [userAvatar, setUserAvatar] = useState(avatar);

  useEffect(() => {
    if (!avatar) {
      const genAvatar = createAvatar(botttsNeutral, {
        seed: uniqueString(),
      });
      const svg = genAvatar.toDataUriSync();
      setUserAvatar(svg);
    }
  }, [avatar]);

  return isNFT && isNFT.length > 0 ? (
    <NFTAvatar className={`avatar`} sx={sx} src={userAvatar} />
  ) : (
    <Avatar
      className={`avatar`}
      sx={{ ...sx, background: theme.tertiaryColor }}
      src={userAvatar}
    />
  );
};

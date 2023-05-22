import React from "react";
import {
  Box,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import { Nav } from ".";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { headerOffset } from "../../utils/boom-web3/constants";

interface LeftDrawerProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerWrapper = styled(Box)(({ theme }) => ({
  maxHeight: headerOffset,
  minHeight: headerOffset,
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: theme.zIndex.drawer - 1,
  borderRight: `1px solid ${theme.tertiaryColor}`,
  overflowY: "scroll",
}));

export const LeftNavDrawer: React.FC<LeftDrawerProps> = ({ setShowMenu }) => {
  const theme = useTheme();
  return (
    <DrawerWrapper>
      <Nav />
      <Box display="flex" justifyContent="flex-end" py={1} width="100%">
        <IconButton onClick={() => setShowMenu(false)}>
          <ChevronLeftIcon
            sx={{
              borderRadius: "50%",
              border: `1px solid ${theme.palette.common.white}`,
            }}
          />
        </IconButton>
      </Box>
    </DrawerWrapper>
  );
};

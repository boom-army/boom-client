import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { CommentIcon } from "../Icons";

import { useContext, useState } from "react";
import { NewTweet } from "./NewTweet";

interface PURProps {
  commentsCount: number;
  parentTweet?: string | undefined;
  masterTweet?: string | undefined;
}

export const PopUpResponse = ({
  commentsCount,
  parentTweet,
  masterTweet,
}: PURProps) => {
  const theme = useTheme();

  const [openReply, setOpenReply] = useState(false);

  const handleClickOpen = () => {
    setOpenReply(true);
  };

  const handleClose = () => {
    setOpenReply(false);
  };

  return (
    <>
      <Link onClick={handleClickOpen} sx={{ textDecoration: "none" }}>
        <Box display="flex" alignItems={"center"}>
          <CommentIcon />
          <Typography ml={0.5} sx={{ color: theme.palette.secondary }}>
            {commentsCount ? commentsCount : null}
          </Typography>
        </Box>
      </Link>
      <Dialog open={openReply} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <NewTweet
            parentTweet={parentTweet}
            masterTweet={masterTweet}
            closePopUp={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

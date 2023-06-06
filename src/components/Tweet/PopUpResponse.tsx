import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { CommentIcon } from "../Icons";

import { useState } from "react";
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
          <Typography ml={0.5} color="secondary">
            {commentsCount ? commentsCount : null}
          </Typography>
        </Box>
      </Link>
      <Dialog
        open={openReply}
        onClose={handleClose}
        PaperProps={{ elevation: 0 }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
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

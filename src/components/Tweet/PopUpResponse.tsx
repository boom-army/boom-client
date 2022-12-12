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
import { ThemeContext } from "../../contexts/theme";
import { useContext, useState } from "react";
import { NewTweet } from "./NewTweet";

interface PURProps {
  commentsCount: number;
  parentTweet?: string | undefined
}

export const PopUpResponse = ({ commentsCount, parentTweet }: PURProps) => {
  const { theme } = useContext(ThemeContext);

  const [openReply, setOpenReply] = useState(false);

  return (
    <Link onClick={() => setOpenReply(true)}>
      <Box display="flex" alignItems={"center"}>
        <CommentIcon />
        <Typography ml={0.5} sx={{ color: theme.secondaryColor }}>
          {commentsCount ? commentsCount : null}
        </Typography>
      </Box>
      <Dialog open={openReply} onClose={() => setOpenReply(false)}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenReply(false)}
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
          <NewTweet parentTweet={parentTweet} />
        </DialogContent>
      </Dialog>
    </Link>
  );
};

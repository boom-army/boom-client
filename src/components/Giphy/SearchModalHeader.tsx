import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FormControl, InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';

interface Props {
  input: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

export const SearchModalHeader: React.FC<Props> = ({
  input,
  setIsLoading,
  setInput,
  handleClose,
}) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth={true}>
      <TextField
        hiddenLabel={true}
        fullWidth={true}
        type="text"
        autoFocus
        placeholder="Search for GIF"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsLoading(true);
          setInput(e.target.value);
        }}
        InputProps={{
          style: { color: theme.palette.primary.main, padding: 10 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClose}
                aria-label="close"
                size="medium"
                disableRipple={true}
              >
                <CloseIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

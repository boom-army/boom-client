import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FormControl, InputAdornment } from "@mui/material";
import { TextField } from "@material-ui/core";
import { ThemeContext } from "../../contexts/theme";

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
  const { theme } = useContext(ThemeContext);
  return (
    <FormControl fullWidth={true}>
      <TextField
        hiddenLabel={true}
        fullWidth={true}
        type="text"
        placeholder="Search for GIF"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsLoading(true);
          setInput(e.target.value);
        }}
        InputProps={{
          style: { color: theme.primaryColor, padding: 10 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClose}
                aria-label="close"
                size="medium"
                disableRipple={true}
              >
                <CloseIcon sx={{ color: theme.accentColor }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

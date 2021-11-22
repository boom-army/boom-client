import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Input from '../Input';

interface Props {
  input: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleClose: (() => void);
};

export const SearchModalHeader: React.FC<Props> = ({ input, setIsLoading, setInput, handleClose }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ margin: "10px 16px" }}
    >
      <IconButton onClick={handleClose} aria-label="close" size="medium" disableRipple={true}>
        <CloseIcon />
      </IconButton>
      <Input
        hideLabel
        fullWidth={true}
        text="Search for gif"
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsLoading(true);
          setInput(e.target.value)
        }}
      />
    </Stack>
  );
};

import React, { createContext, useContext } from 'react';
import { Alert, AlertColor } from '@mui/material';
import { Snackbar } from '@material-ui/core';

type SnackBarContextActions = {
  enqueueSnackbar: (text: string, { variant }: { variant: AlertColor }) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [typeColor, setTypeColor] = React.useState<AlertColor>('info');

  const enqueueSnackbar = (text: string, { variant }: { variant: AlertColor }) => {
    setMessage(text);
    setTypeColor(variant);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeColor('info');
  };

  return (
    <SnackBarContext.Provider value={{ enqueueSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeColor}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackbar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within the SnackBarProvider');
  }

  return context;
};

export { SnackBarProvider, useSnackbar };
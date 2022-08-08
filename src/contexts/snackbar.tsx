import React, { createContext, useContext } from "react";
import { Alert, AlertColor, useTheme } from "@mui/material";
import { Snackbar } from "@mui/material";

type SnackBarContextActions = {
  enqueueSnackbar: (text: string, { variant }: { variant: AlertColor }) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [typeColor, setTypeColor] = React.useState<AlertColor>("info");

  const enqueueSnackbar = (
    text: string,
    { variant }: { variant: AlertColor }
  ) => {
    setMessage(text);
    setTypeColor(variant);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeColor("info");
  };

  return (
    <SnackBarContext.Provider value={{ enqueueSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={100000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={typeColor}
          sx={{ width: "100%", border: `1px solid ${theme.palette.secondary.dark}` }}
        >
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
    throw new Error("useSnackbar must be used within the SnackbarProvider");
  }

  return context;
};

export { SnackbarProvider, useSnackbar };

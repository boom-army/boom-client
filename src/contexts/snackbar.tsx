import React, { createContext, useContext, useState } from "react";
import { Alert, AlertColor } from "@mui/material";
import { ThemeContext } from "./theme";
import { Snackbar } from "@mui/material";

type SnackBarContextActions = {
  enqueueSnackbar: (
    text: string,
    options: {
      key?: number;
      variant?: AlertColor;
      action?: React.ReactNode | null;
    }
  ) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const { theme } = useContext(ThemeContext);

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [typeColor, setTypeColor] = React.useState<AlertColor | undefined>(
    "info"
  );
  const [action, setAction] = React.useState<React.ReactNode | null>(null);
  const [activeSnackbarKey, setActiveSnackbarKey] = useState<number | null>(
    null
  );

  const enqueueSnackbar = (
    text: string,
    options: {
      key?: number;
      variant?: AlertColor;
      action?: React.ReactNode | null;
    }
  ) => {
    if (!options.key || options.key === activeSnackbarKey) {
      setMessage(text);
      setTypeColor(options.variant);
      setAction(options.action);
      setOpen(true);
      setActiveSnackbarKey(options.key || null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAction(null);
    setTypeColor("info");
    setActiveSnackbarKey(null);
  };

  return (
    <SnackBarContext.Provider value={{ enqueueSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={typeColor}
          sx={{ width: "100%", border: `1px solid ${theme.tertiaryColor}` }}
        >
          {message} {action && action}
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

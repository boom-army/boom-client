import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, AlertColor, Snackbar, LinearProgress } from "@mui/material";
import { ThemeContext } from "./theme";

type SnackBarContextActions = {
  enqueueSnackbar: (
    text: string,
    options: {
      key?: number;
      variant?: AlertColor;
      action?: React.ReactNode | null;
      progress?: number;
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
  const [progress, setProgress] = useState<number>(0);

  const enqueueSnackbar = (
    text: string,
    options: {
      key?: number;
      variant?: AlertColor;
      action?: React.ReactNode | null;
      progress?: number;
    }
  ) => {
    if (!options.key || options.key === activeSnackbarKey) {
      setMessage(text);
      setTypeColor(options.variant);
      setAction(options.action);
      setOpen(true);
      setActiveSnackbarKey(options.key || null);
      setProgress(options.progress || 0);
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
          {progress && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ marginTop: 1 }}
            />
          )}
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

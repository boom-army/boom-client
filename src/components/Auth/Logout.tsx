import { useCallback } from "react";
import { useSnackbar } from "../../contexts/snackbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { Stack, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export const Logout = ({ iconProps, stackProps }: any) => {
  const { disconnect } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = useCallback(
    (event: any) => {
      localStorage.clear();
      disconnect().catch(() => {
        // Silently catch because any errors are caught by the context `onError` handler
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2100);
      window.location.reload();
      return enqueueSnackbar("You are logged out", { variant: "success" });
    },
    [disconnect, enqueueSnackbar]
  );

  return (
    <Stack onClick={handleLogout} direction="row" {...stackProps} sx={{cursor: "pointer"}}>
      <LogoutIcon sx={iconProps} />
      <Typography variant="body1">Logout</Typography>
    </Stack>
  );
};

export default Logout;

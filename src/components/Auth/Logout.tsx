import { Box } from "@mui/material";
import { UserIcon } from "../Icons";
import { useCallback } from "react";
import { useSnackbar } from "../../contexts/snackbar";
import { useTheme } from '@mui/material/styles';
import { useWallet } from "@solana/wallet-adapter-react";

const Logout = () => {
  const theme = useTheme();
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
    <Box onClick={handleLogout}>
      <UserIcon sm="true" color={theme.palette.primary.main} />
      <p>Logout</p>
    </Box>
  );
};

export default Logout;

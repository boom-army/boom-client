import React, { useCallback, useContext } from "react";
import { ThemeContext } from "../../contexts/theme";
import { UserIcon } from "../Icons";
import { Wrapper } from "../ToggleTheme";
import { useSnackbar } from "notistack";
import { useWallet } from "@solana/wallet-adapter-react";

const Logout = () => {
  const { theme } = useContext(ThemeContext);
  const { disconnect } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = useCallback(
    (event) => {
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
    <Wrapper onClick={handleLogout}>
      <UserIcon sm="true" color={theme.accentColor} />
      <p>Logout</p>
    </Wrapper>
  );
};

export default Logout;

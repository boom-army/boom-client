import React, { useCallback, useContext } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from "react-toastify";
import { UserIcon } from "../Icons";
import { ThemeContext } from "../../contexts/theme";
import { Wrapper } from "../ToggleTheme";

const Logout = () => {
	const { theme } = useContext(ThemeContext);
	const { disconnect } = useWallet();

	const handleLogout = useCallback(
        (event) => {
		localStorage.clear();
		disconnect().catch(() => {
			// Silently catch because any errors are caught by the context `onError` handler
		});
		setTimeout(() => {
			window.location = "/";
		}, 2100);
		window.location.reload();
		toast.success("You are logged out");
	},
	[disconnect]);

	return (
		<Wrapper onClick={handleLogout}>
			<UserIcon sm color={theme.accentColor} />
			<p>Logout</p>
		</Wrapper>
	);
};

export default Logout;

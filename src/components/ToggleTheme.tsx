import { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { ThemeIcon } from "./Icons";
import { ColorModeContext } from "../contexts/theme";
import { Box } from "@mui/material";

const ToggleTheme = () => {
  // const localSt = localStorage.getItem("theme");
  // const [currentTheme, setCurrentTheme] = useState(localSt ? localSt : "dark");

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box onClick={colorMode.toggleColorMode}>
      <ThemeIcon sm="true" color={theme.palette.primary.main} />
      <p>Theme</p>
    </Box>
  );
};

export default ToggleTheme;

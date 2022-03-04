import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MorePopUp } from "../components/MorePopup";
// import Person from '@mui/icons-material/Person';
import StyleIcon from "@mui/icons-material/Style";
import GroupIcon from "@mui/icons-material/Group";
import Language from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Badge, Stack, Typography } from "@mui/material";
import { User as StoreUser } from "../contexts/user";
import { ThemeContext } from "../contexts/theme";
import { styled } from "@mui/material/styles";

interface Props {
  newMentionsCount: Number | undefined;
  user: StoreUser | null;
}

export const Nav = ({ newMentionsCount, user }: Props) => {
  const { theme } = useContext(ThemeContext);
  const iconProps = {
    color: theme.accentColor,
  };

  const applyActiveStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? theme.accentColor : theme.primaryColor,
  });

  const stackProps = {
    justifyContent: "flex-end",
    spacing: 3,
    alignItems: "center",
    marginRight: "2rem",
  };

  const StyledStack = styled(Stack)({
    minHeight: "100vh",
    marginTop: "1.3rem",
    fontWeight: 500,
    alignItems: "flex-start",
  });

  return (
    <StyledStack direction="column" spacing={4.5}>
      <NavLink style={applyActiveStyles} to="/">
        <Stack direction="row" {...stackProps}>
          <Language style={iconProps} />
          <Typography variant="body1">Community</Typography>
        </Stack>
      </NavLink>
      <NavLink style={applyActiveStyles} to="/mint-nft">
        <Stack direction="row" {...stackProps}>
          <StyleIcon sx={iconProps} />
          <Typography variant="body1">Mint NFT</Typography>
        </Stack>
      </NavLink>
      {/* <NavLink style={applyActiveStyles} to="/following">
        <Stack direction="row" {...stackProps}>
          <Person sx={iconProps} />
          <Typography variant="body1" display={displayProps}>
            Following
          </Typography>
        </Stack>
      </NavLink> */}
      <NavLink style={applyActiveStyles} to="/connect">
        <Stack direction="row" {...stackProps}>
          <GroupIcon sx={iconProps} />
          <Typography variant="body1">Creators</Typography>
        </Stack>
      </NavLink>
      <NavLink style={applyActiveStyles} to="/notifications">
        <Stack direction="row" {...stackProps}>
          <Badge
            max={99}
            badgeContent={newMentionsCount ?? 0}
            sx={{
              "& .MuiBadge-badge": {
                color: "#FFFFFF",
                backgroundColor: theme.accentColor,
              },
            }}
          >
            <NotificationsIcon sx={iconProps} />
          </Badge>
          <Typography variant="body1">Notifications</Typography>
        </Stack>
      </NavLink>
      {user?.handle && (
        <NavLink style={applyActiveStyles} to={`/${user?.handle}`}>
          <Stack direction="row" {...stackProps}>
            <AccountCircleIcon sx={iconProps} />
            <Typography variant="body1">Profile</Typography>
          </Stack>
        </NavLink>
      )}
      <MorePopUp iconProps={iconProps} stackProps={stackProps} />
    </StyledStack>
  );
};

import React, { useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from "@mui/icons-material/Check";
import { Avatar, Box, Typography } from "@mui/material";
import { ThemeContext } from "../contexts/theme";
import { styled } from "@mui/material/styles";


export const ChannelView: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const BoxStyled = styled(Box)({
    h3: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "22px",
      padding: "0.2em 0 0.5em",
    },
    "& .MuiTypography-body2": {
      fontWeight: 300,
    }
  });

  return (
    <>
      <BoxStyled
        m={1}
        p={1}
        sx={{
          backgroundColor: true ? theme.primaryColor : theme.background,
          borderRadius: 1,
          display: "flex",
          border: true ? 0 : `1px solid ${theme.secondaryColor}`,
        }}
      >
        <Box mr={1}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h3">Boom.Army</Typography>
            </Box>
            <Box>
              {true ? (
                <Avatar sx={{ width: 16, height: 16, background: theme.palette.grey[500] }}>
                  <AddIcon sx={{width: 16}} />
                </Avatar>
              ) : (
                <Avatar sx={{ width: 16, height: 16, background: theme.success }}>
                  <CheckIcon sx={{width: 14}} />
                </Avatar>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2">Members</Typography>
            </Box>
            <Box>
              <Typography variant="body2">2nSv...A67s</Typography>
            </Box>
          </Box>
        </Box>
      </BoxStyled>
    </>
  );
};

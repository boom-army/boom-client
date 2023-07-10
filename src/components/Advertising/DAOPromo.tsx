import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
  Link,
} from "@mui/material";

interface Props {
  heading: string;
  body: string;
  buttonText: string;
  buttonLink: string;
  openBlank?: boolean;
}

export const DAOPromo: React.FC<Props> = ({
  heading,
  body,
  buttonText,
  buttonLink,
  openBlank = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        margin: "1em",
        padding: "1em",
        border: `2px solid ${theme.blue.light}`,
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", p: "0.5em 1em 0 1em" }}>
          <Typography component="div" variant="h4" pb={1}>
            {heading}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            pb={2}
          >
            {body}
          </Typography>
          {buttonText && (
            <Button
              component={Link}
              size="small"
              variant="contained"
              href={buttonLink}
              target={openBlank ? "_blank" : "_self"}
            >
              {buttonText}
            </Button>
          )}
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
};

import React, { useContext, useState } from "react";
import { Box } from "@mui/system";
import { TextField, Stack, Button } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import { styled } from "@mui/system";

interface Props {}

export const TipInput: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  const [inputError, setInputError] = useState(true);

  const Wrapper = styled("div")`
    position: absolute;
    bottom: 2em;
    left: -12em;
    background: ${theme.background};
    padding: 1em;
    border-radius: 5px;
    border: 1px solid ${theme.secondaryColor};
    min-width: 400px;
    & .MuiInputLabel-root {
      color: ${theme.secondaryColor};
    }
    & .MuiOutlinedInput-input {
      border-color: ${theme.accentColor};
    }
    & .MuiInputBase-root {
      width: 100%;
    }
  `;
  return (
    <Wrapper>
      <Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                alert("clicked");
              }}
            >
              1
            </Button>
          </div>
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                alert("clicked");
              }}
            >
              3
            </Button>
          </div>
          <TextField
            error={inputError}
            id="outlined-number"
            label="Custom"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                alert("clicked");
              }}
            >
              Tip
            </Button>
          </div>
        </Stack>
      </Box>
    </Wrapper>
  );
};

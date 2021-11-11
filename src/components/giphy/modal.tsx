import React, { useState, useEffect, useContext, useCallback } from 'react'
import { ThemeContext } from "../../contexts/theme";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { GIFObject } from 'giphy-api';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Input from '../Input';
import { GifIcon } from "../Icons";
import { GiphyContext, Search } from "../../contexts/giphy";
import debounce from 'lodash.debounce';
import { ImageGrid } from './ImageGrid';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const GifButton = styled('button')`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`;

const GIPHY_API = process.env.REACT_APP_GIPHY_KEY;

export const GiphyModal: React.FC<({ setGif: React.Dispatch<React.SetStateAction<GIFObject>> })> = ({ setGif }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<any>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { theme } = useContext(ThemeContext);
  const [searchResults, setSearchResults] = useState<Search | null>(null);
  const { trendingGiphy, setTrendingGiphy, searchGiphy, setSearchGiphy } = useContext(GiphyContext);

  const getJSON = async (endpoint: string) => {
    const response = await fetch(endpoint);
    return response.json();
  };

  const handleInputQuery = debounce(async (
    value: string,
    searchGiphy: Search[],
    setSearchGiphy: React.Dispatch<React.SetStateAction<Search[]>> | (() => void),
    setSearchResults: React.Dispatch<React.SetStateAction<Search | null>>,
  ) => {
    if (!value) return setSearchResults(null);

    const cachedGif = searchGiphy.find(gif => gif.query === value);

    if (cachedGif) {
      setError(false);
      return setSearchResults(cachedGif);
    }

    try {
      const json = await getJSON(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API}&offset=0&q=${value}`);
      const searchResult = {
        query: value,
        gif: json.data,
      };

      setSearchGiphy([...searchGiphy, searchResult]);
      setSearchResults(searchResult);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, 800);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoDebouncedQuery = useCallback(handleInputQuery, []);

  useEffect(() => {
    if (!open || input) return;

    if (trendingGiphy.length) {
      setError(false);
      return;
    }

    const fetchTrendingGiphy = async (offset: number = 0) => {
      try {
        const json = await getJSON(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API}&offset=${offset}`);
        setTrendingGiphy(json.data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchTrendingGiphy();
  }, [input, open, trendingGiphy, setTrendingGiphy]);

  useEffect(() => {
    memoDebouncedQuery(input, searchGiphy, setSearchGiphy, setSearchResults);
  }, [input, memoDebouncedQuery, searchGiphy, setSearchGiphy, setSearchResults]);

  return (
    <>
      <GifButton type="button" className="tweet-gif" onClick={handleOpen}>
        <GifIcon />
      </GifButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={{
          position: 'absolute',
          minWidth: 600,
          maxWidth: 600,
          overflowX: 'hidden',
          overflowY: 'scroll',
          maxHeight: '90vh',
          height: 650,
          top: '5%',
          color: theme.primaryColor,
          background: theme.background,
        }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ margin: 2 }}
          >
            <IconButton onClick={handleClose} aria-label="close" size="medium" disableRipple={true}>
              <CloseIcon />
            </IconButton>
            <Input
              hideLabel
              fullWidth={true}
              text="Search for gif"
              type="text"
              placeholder="Search"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            />
          </Stack>

          {error ? (
            <Box sx={{ margin: 2 }}>
              <p>No gifs were found</p>
            </Box>
          ) : (
            <>
              {searchResults && <ImageGrid gifArr={searchResults.gif} setGif={setGif} setOpen={setOpen} />}
              {trendingGiphy && !searchResults && <ImageGrid gifArr={trendingGiphy} setGif={setGif} setOpen={setOpen} />}
            </>
          )}
        </Box>
      </StyledModal>
    </>
  );
}

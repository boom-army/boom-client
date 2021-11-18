import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'
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
import { ImageSuggestionGrid } from './ImageSuggestionGrid';
import { Loader } from '../Loader';

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

const queryGiphy = async (query: string, offset: number = 0): Promise<Search> => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API}&offset=${offset}&q=${query}`);
  const json = await response.json();
  return { query, gif: json.data };
};

export const GiphyModal: React.FC<({ setGif: React.Dispatch<React.SetStateAction<GIFObject>> })> = ({ setGif }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<Search | null>(null); // current searched gifs
  const { searchGiphy, setSearchGiphy } = useContext(GiphyContext); // search cache
  const { theme } = useContext(ThemeContext);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setInput("");
    setError(false);
    setSearchResults(null);
    setOpen(true);
  };

  const imageBoxRef = useRef<any>(null);

  const handleScroll = debounce(async () => {
    if (!imageBoxRef.current) return;
    const { scrollHeight, scrollTop, clientHeight } = imageBoxRef.current;

    if (scrollHeight - scrollTop - clientHeight >= 1) return;

    try {
      const currentSearchResultsLength = searchResults?.gif.length;
      // the initial search returned no hits so there is no point querying again
      if (currentSearchResultsLength === 0) return;

      setIsLoadingMore(true);

      const result = await queryGiphy(input, currentSearchResultsLength);

      if (!result.gif.length) return;

      const updatedSearchCache = searchGiphy.map(search => {
        if (search.query === result.query) {
          return {
            query: search.query,
            gif: [...search.gif, ...result.gif],
          };
        }
        return search;
      })

      setSearchGiphy(updatedSearchCache);
      const updatedGifs = updatedSearchCache.find(cache => cache.query === input) || null;
      setSearchResults(updatedGifs);
    } finally {
      setIsLoadingMore(false);
    }
  }, 300);

  const memoDebouncedScrollHandler = useCallback(handleScroll, [searchResults, searchGiphy]);

  useEffect(() => {
    console.log('listener')
    const imageListNode = imageBoxRef.current;

    if (!imageListNode) return;

    imageListNode.addEventListener("scroll", memoDebouncedScrollHandler);
    return () => {
      imageListNode.removeEventListener("scroll", memoDebouncedScrollHandler);
    };
  }, [memoDebouncedScrollHandler]);

  const handleInputQuery = debounce(async (
    value: string,
    searchGiphy: Search[],
  ) => {
    setError(false);

    if (!value) {
      setIsLoading(false);
      return setSearchResults(null);
    }

    const cachedGif = searchGiphy.find(gif => gif.query === value);

    if (cachedGif) {
      setIsLoading(false);
      return setSearchResults(cachedGif);
    }

    try {
      const searchResult = await queryGiphy(value);
      setSearchGiphy([...searchGiphy, searchResult]);
      setSearchResults(searchResult);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, 800);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoDebouncedQuery = useCallback(handleInputQuery, []);

  useEffect(() => {
    console.log('init')
    memoDebouncedQuery(input, searchGiphy);
  }, [input, memoDebouncedQuery, searchGiphy]);

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
          overflowY: 'hidden',
          maxHeight: '90vh',
          height: 650,
          top: '5%',
          color: theme.primaryColor,
          background: theme.background,
        }}>
          <Stack
            direction="column"
            sx={{ height: "100%" }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ margin: "10px 16px" }}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsLoading(true);
                  setInput(e.target.value)
                }}
              />
            </Stack>
            <Box ref={imageBoxRef} sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
              {isLoading || error ? (
                <Box sx={{ margin: 2, position: "relative" }}>
                  {isLoading ? <Loader /> : <p>There was an error while trying to search.</p>}
                </Box>
              ) : (
                <>
                  {searchResults && <ImageGrid gifArr={searchResults.gif} setGif={setGif} setOpen={setOpen} isLoadingMore={isLoadingMore} />}
                  {!searchResults && <ImageSuggestionGrid setInput={setInput} setIsLoading={setIsLoading} />}
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </StyledModal>
    </>
  );
}

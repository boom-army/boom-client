import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Box } from "@mui/system";
import { GifIcon } from "../Icons";
import { GiphyContext, Search } from "../../contexts/giphy";
import { ImageGrid } from "./ImageGrid";
import { ImageSuggestionGrid } from "./ImageSuggestionGrid";
import { Loader } from "../Loader";
import { SearchModalHeader } from "./SearchModalHeader";
import { ThemeContext } from "../../contexts/theme";
import { debounce } from "lodash";
import { ModalUnstyled } from '@mui/base';
import { IconButton, Stack, styled } from "@mui/material";

const StyledModal = styled(ModalUnstyled)({
  position: "absolute",
  top: "28%",
  left: "25%",
  height: "80%",
});

const Backdrop = styled("div")({
  // zIndex: '-1',
  position: "fixed",
  right: "0",
  bottom: "0",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
});

const GIPHY_API = process.env.REACT_APP_GIPHY_KEY as string;

const queryGiphy = async (
  query: string,
  offset: number = 0
): Promise<Search> => {
  const queryParams = new URLSearchParams({
    api_key: GIPHY_API,
    offset: offset.toString(),
    q: query,
  });
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?${queryParams}`
  );
  const json = await response.json();
  return { query, gif: json.data };
};

export const GifyModal: React.FC<{
  setGif: any;
}> = ({ setGif }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<Search | null>(null); // current searched gifs
  const { searchGiphyCache, setSearchGiphyCache } = useContext(GiphyContext); // search cache
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
    if (!imageBoxRef.current || !input) return;
    const { scrollHeight, scrollTop, clientHeight } = imageBoxRef.current;

    if (scrollHeight - scrollTop - clientHeight >= 1) return;

    try {
      const currentSearchResultsLength = searchResults?.gif.length;
      // the initial search returned no hits so there is no point querying again
      if (currentSearchResultsLength === 0) return;

      setIsLoadingMore(true);

      const query = input.toLowerCase();
      const result = await queryGiphy(query, currentSearchResultsLength);

      if (!result?.gif.length) return;

      const updatedSearchCache = searchGiphyCache.map((cache) => {
        if (cache.query === result.query) {
          return {
            query: cache.query,
            gif: [...cache.gif, ...result.gif],
          };
        }
        return cache;
      });

      setSearchGiphyCache(updatedSearchCache);
      const updatedGifs =
        updatedSearchCache.find((cache) => cache.query === query) || null;
      setSearchResults(updatedGifs);
    } finally {
      setIsLoadingMore(false);
    }
  }, 300);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoDebouncedScrollHandler = useCallback(handleScroll, [
    searchResults,
    searchGiphyCache,
    input,
  ]);

  useEffect(() => {
    const imageListNode = imageBoxRef.current;

    if (!imageListNode) return;

    imageListNode.addEventListener("scroll", memoDebouncedScrollHandler);
    return () => {
      imageListNode.removeEventListener("scroll", memoDebouncedScrollHandler);
    };
  }, [memoDebouncedScrollHandler]);

  const handleInputQuery = debounce(
    async (value: string, searchGiphyCache: Search[]) => {
      setError(false);

      const query = value.toLowerCase();

      if (!query) {
        setIsLoading(false);
        return setSearchResults(null);
      }

      const cachedGif = searchGiphyCache.find((gif) => gif.query === query);

      if (cachedGif) {
        setIsLoading(false);
        return setSearchResults(cachedGif);
      }

      try {
        const searchResult = await queryGiphy(query);
        setSearchGiphyCache([...searchGiphyCache, searchResult]);
        setSearchResults(searchResult);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    },
    800
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoDebouncedQuery = useCallback(handleInputQuery, []);

  useEffect(() => {
    memoDebouncedQuery(input, searchGiphyCache);
  }, [input, memoDebouncedQuery, searchGiphyCache]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <GifIcon />
      </IconButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box
          sx={{
            position: "absolute",
            minWidth: 600,
            maxWidth: 600,
            overflowX: "hidden",
            overflowY: "hidden",
            maxHeight: "90vh",
            height: 650,
            top: "5%",
            color: theme.primaryColor,
            background: theme.background,
          }}
        >
          <Stack direction="column" sx={{ height: "100%" }}>
            <SearchModalHeader
              input={input}
              setIsLoading={setIsLoading}
              setInput={setInput}
              handleClose={handleClose}
            />
            <Box
              ref={imageBoxRef}
              sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}
            >
              {isLoading || error ? (
                <Box sx={{ margin: 2, position: "relative" }}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <p>There was an error while searching.</p>
                  )}
                </Box>
              ) : (
                <>
                  {searchResults && (
                    <ImageGrid
                      gifArr={searchResults.gif}
                      setGif={setGif}
                      setOpen={setOpen}
                      isLoadingMore={isLoadingMore}
                    />
                  )}
                  {!searchResults && (
                    <ImageSuggestionGrid
                      setInput={setInput}
                      setIsLoading={setIsLoading}
                    />
                  )}
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </StyledModal>
    </>
  );
};
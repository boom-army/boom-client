import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { GIPHY_SEARCH_SUGGESTIONS } from "../../constants/giphy-search-suggestions";

type SetInput = React.Dispatch<React.SetStateAction<string>>;
type SetIsLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const ImageSuggestionGrid: React.FC<{
  setInput: SetInput;
  setIsLoading: SetIsLoading;
}> = ({ setInput, setIsLoading }) => {
  return (
    <>
      <ImageList cols={2} gap={2} sx={{ overflowY: "hidden" }}>
        {GIPHY_SEARCH_SUGGESTIONS.map((item, index) => {
          // If the last item is odd, then make it fill the entire row
          const isLastItem = index === GIPHY_SEARCH_SUGGESTIONS.length - 1;
          const isLastItemOdd = GIPHY_SEARCH_SUGGESTIONS.length % 2 === 1;
          const cols = isLastItem && isLastItemOdd ? 2 : 1;
          const rows = isLastItem && isLastItemOdd ? 2 : 1;

          return (
            <ImageListItem
              key={item.id}
              cols={cols}
              rows={rows}
              sx={{
                height: "150px!important",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsLoading(true);
                setInput(item.title);
              }}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={item.title}
                position="top"
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
};

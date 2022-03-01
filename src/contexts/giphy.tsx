import React, { useState } from "react";
import { GIFObject } from "giphy-api";

export type GiphyContextType = {
  searchGiphyCache: Array<Search>;
  setSearchGiphyCache:
    | React.Dispatch<React.SetStateAction<Search[]>>
    | (() => void);
};

export const GiphyContext = React.createContext<GiphyContextType>({
  searchGiphyCache: [],
  setSearchGiphyCache: () => console.warn("no setStateAction provided"),
});

export interface Search {
  query: string;
  gif: Array<GIFObject>;
}

export const GiphyContextProvider: React.FC = ({ children }) => {
  const [searchGiphyCache, setSearchGiphyCache] = useState<Array<Search>>([]);

  return (
    <GiphyContext.Provider value={{ searchGiphyCache, setSearchGiphyCache }}>
      {children}
    </GiphyContext.Provider>
  );
};

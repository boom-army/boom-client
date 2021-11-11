import React, { useState } from "react";
import { GIFObject } from 'giphy-api';

export type GiphyContextType = {
  trendingGiphy: Array<GIFObject>,
  setTrendingGiphy: React.Dispatch<React.SetStateAction<GIFObject[]>> | (() => void),
  searchGiphy: Array<Search>,
  setSearchGiphy: React.Dispatch<React.SetStateAction<Search[]>> | (() => void),
};

export const GiphyContext = React.createContext<GiphyContextType>({
  trendingGiphy: [],
  setTrendingGiphy: () => console.warn("no setStateAction provided"),
  searchGiphy: [],
  setSearchGiphy: () => console.warn("no setStateAction provided"),
});

export interface Search {
  query: string,
  gif: Array<GIFObject>
};

export const GiphyContextProvider: React.FC = ({ children }) => {
  const [trendingGiphy, setTrendingGiphy] = useState<Array<GIFObject>>([]);
  const [searchGiphy, setSearchGiphy] = useState<Array<Search>>([]);

  return (
    <GiphyContext.Provider value={{ trendingGiphy, setTrendingGiphy, searchGiphy, setSearchGiphy }}>
      {children}
    </GiphyContext.Provider>
  );
};

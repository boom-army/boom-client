import React, { useState } from "react";
import { GIFObject } from 'giphy-api';

export type GiphyContextType = {
  searchGiphy: Array<Search>,
  setSearchGiphy: React.Dispatch<React.SetStateAction<Search[]>> | (() => void),
};

export const GiphyContext = React.createContext<GiphyContextType>({
  searchGiphy: [],
  setSearchGiphy: () => console.warn("no setStateAction provided"),
});

export interface Search {
  query: string,
  gif: Array<GIFObject>
};

export const GiphyContextProvider: React.FC = ({ children }) => {
  const [searchGiphy, setSearchGiphy] = useState<Array<Search>>([]);

  return (
    <GiphyContext.Provider value={{ searchGiphy, setSearchGiphy }}>
      {children}
    </GiphyContext.Provider>
  );
};

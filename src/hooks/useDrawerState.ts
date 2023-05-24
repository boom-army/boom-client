import React from "react";
import { atom, useRecoilState } from "recoil";

export const drawerState = atom({
  key: "drawerState",
  default: {
    leftNavOpen: false,
    rightProfileOpen: false,
  },
});

export const useDrawerState = () => {
  const [drawer, setDrawer] = useRecoilState(drawerState);

  const toggleLeftNav = (isOpen: boolean) => {
    setDrawer((prevState) => ({
      ...prevState,
      leftNavOpen: isOpen,
    }));
  };

  const toggleRightProfile = (isOpen: boolean) => {
    setDrawer((prevState) => ({
      ...prevState,
      rightProfileOpen: isOpen,
    }));
  };

  return {
    drawer,
    toggleLeftNav,
    toggleRightProfile,
  };
};

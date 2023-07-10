import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

interface SidebarState {
  leftSidebarFull: boolean;
  rightNotificationsFull: boolean;
}

const sidebarStateKey = "sidebarState";

export const sideBar = atom({
  key: "sidebarState",
  default: JSON.parse(localStorage.getItem(sidebarStateKey) || "null") || {
    leftSidebarFull: false,
    rightNotificationsFull: false,
  },
});

export const useSidebarState = () => {
  const [sidebar, setSidebar] = useRecoilState(sideBar);

  useEffect(() => {
    localStorage.setItem(sidebarStateKey, JSON.stringify(sidebar));
  }, [sidebar]);

  const toggleLeftSidebar = (isOpen: boolean) => {
    setSidebar((prevState: SidebarState) => ({
      ...prevState,
      leftSidebarFull: isOpen,
    }));
  };

  const toggleRightSidebar = (isOpen: boolean) => {
    setSidebar((prevState: SidebarState) => ({
      ...prevState,
      rightNotificationsFull: isOpen,
    }));
  };

  return {
    sidebar,
    toggleLeftSidebar,
    toggleRightSidebar,
  };
};

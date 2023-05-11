import { atom, useSetRecoilState } from 'recoil';

export const drawerState = atom({
  key: 'drawerState',
  default: false,
});

export const useToggleDrawer = () => {
  const setDrawer = useSetRecoilState(drawerState);

  return (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };
};
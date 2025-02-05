import { useContext } from 'react';
import { MUIContextMenu } from '../context';
import { BaseMenuItemProps, MenuAnchorRef, MenuItemProps, ShrunkMenuProps } from '../types';

export type MUIContextMenuHookProps = {
  items: MenuItemProps[];
  anchorRef: MenuAnchorRef;
  menuProps?: ShrunkMenuProps;
  menuItemProps?: BaseMenuItemProps;
};

export const useMUIContextMenu = ({
  items,
  anchorRef,
  menuProps,
  menuItemProps,
}: MUIContextMenuHookProps) => {
  const { setItems, setMenuAnchorRef, setMenuProps, setMenuItemProps } =
    useContext(MUIContextMenu);

  return {
    show() {
      setItems(items);

      if (menuItemProps) {
        setMenuItemProps(menuItemProps)
      }

      if (menuProps) {
        setMenuProps(menuProps);
      }

      setMenuAnchorRef(anchorRef);
    },
    hide() {
      setMenuAnchorRef(null);
    },
  };
};

import { useContext, useEffect } from 'react';
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

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    if (menuProps) {
      setMenuProps(menuProps);
    }
  }, [menuProps]);

  useEffect(() => {
    if (menuItemProps) {
      setMenuItemProps(menuItemProps)
    }
  }, [menuItemProps]);

  return {
    show() {
      setMenuAnchorRef(anchorRef);
    },
    hide() {
      setMenuAnchorRef(null);
    },
  };
};

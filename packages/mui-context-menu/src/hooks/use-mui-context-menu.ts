import { useContext, useEffect } from 'react';
import { MUIContextMenu } from '../context';
import { MenuAnchorRef, MenuItemProps, ShrunkMenuProps } from '../types';

export type MUIContextMenuHookProps = {
  items: MenuItemProps[];
  anchorRef: MenuAnchorRef;
  menuProps?: ShrunkMenuProps;
};

export const useMUIContextMenu = ({
  items,
  anchorRef,
  menuProps,
}: MUIContextMenuHookProps) => {
  const { setItems, setMenuAnchorRef, setMenuProps } =
    useContext(MUIContextMenu);

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    if (menuProps) {
      setMenuProps(menuProps);
    }
  }, [menuProps]);

  return {
    show() {
      setMenuAnchorRef(anchorRef);
    },
    hide() {
      setMenuAnchorRef(null);
    },
  };
};

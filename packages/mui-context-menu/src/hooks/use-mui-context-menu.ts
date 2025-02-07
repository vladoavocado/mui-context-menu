import { useContext } from 'react';
import { ContextMenuContext, ContextMenuContextValue } from '../context';
import {
  BaseMenuItemProps,
  MenuAnchorRef,
  MenuItemProps,
  ShrunkMenuProps,
} from '../types';

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
}: MUIContextMenuHookProps): Omit<ContextMenuContextValue, 'openMenu'> & {
  openMenu: () => void;
} => {
  const {
    isOpen,
    openMenu: baseOpenMenu,
    closeMenu: baseCloseMenu,
  } = useContext(ContextMenuContext);

  return {
    isOpen,
    openMenu: () => {
      baseOpenMenu({
        anchor: anchorRef || null,
        items,
        menuProps,
        itemProps: menuItemProps,
      });
    },
    closeMenu: baseCloseMenu,
    disableCloseOnOutsideClick: () => {},
  };
};

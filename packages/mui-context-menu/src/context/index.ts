// file: packages/mui-context-menu/src/context/ContextMenuContext.ts
import { createContext } from 'react';
import type {
  MenuItemProps,
  ShrunkMenuProps,
  BaseMenuItemProps,
} from '../types';

export interface ContextMenuOptions {
  items: MenuItemProps[];
  anchor: HTMLElement | null;
  menuProps?: ShrunkMenuProps;
  itemProps?: BaseMenuItemProps;
  closeOnOutsideClick?: boolean;
}

export interface ContextMenuContextValue {
  disableCloseOnOutsideClick: (isDisabled: boolean) => void;
  openMenu: (options: ContextMenuOptions) => void;
  closeMenu: () => void;
  isOpen: boolean;
}

const noop = () => {
  console.info(
    'Context menu is not initialized. Please wrap your component in <ContextMenuProvider>.',
  );
};

export const ContextMenuContext = createContext<ContextMenuContextValue>({
  openMenu: noop,
  closeMenu: noop,
  disableCloseOnOutsideClick: noop,
  isOpen: false,
});

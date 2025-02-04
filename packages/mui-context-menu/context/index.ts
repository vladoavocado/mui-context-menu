import { createContext } from 'react';
import { MenuAnchorRef, MenuItemProps, ShrunkMenuProps } from '../types';

export type MUIContextMenuProps = {
  setItems(items: MenuItemProps[]): void;
  setMenuAnchorRef(ref: MenuAnchorRef): void;
  setMenuProps(props: ShrunkMenuProps): void;
  menuAnchorEl: HTMLElement | null;
};

function noop() {
  // eslint-disable-next-line no-console
  console.info(
    `Possibly you forgot to wrap your component with MUIContextMenuProvider.`,
  );
}

export const MUIContextMenu = createContext<MUIContextMenuProps>({
  setItems: noop,
  setMenuAnchorRef: noop,
  setMenuProps: noop,
  menuAnchorEl: null,
});

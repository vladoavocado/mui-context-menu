import { useContext, useMemo } from 'react';
import { ContextMenuContext, ContextMenuContextValue } from '../context';

export const useMuiContextMenuSettings = () => {
  const { disableCloseOnOutsideClick, closeMenu, isOpen } =
    useContext(ContextMenuContext);

  return useMemo<Omit<ContextMenuContextValue, 'openMenu'>>(
    () => ({
      disableCloseOnOutsideClick,
      closeMenu,
      isOpen,
    }),
    [disableCloseOnOutsideClick, isOpen],
  );
};

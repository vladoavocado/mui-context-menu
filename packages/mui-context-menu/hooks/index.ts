import { useContext, useEffect } from 'react';
import { MUIContextMenu } from '../context';
import { MenuAnchorRef, MenuItemProps } from '../types';

export type MUIContextMenuHookProps = {
  items: MenuItemProps[];
  anchorRef: MenuAnchorRef;
};

export const useMUIContextMenu = ({
  items,
  anchorRef,
}: MUIContextMenuHookProps) => {
  const { setItems, setMenuAnchorRef } = useContext(MUIContextMenu);
  useEffect(() => {
    setItems(items);
  }, [items]);

  return {
    show() {
      setMenuAnchorRef(anchorRef);
    },
    hide() {
      setMenuAnchorRef(null);
    },
  };
};

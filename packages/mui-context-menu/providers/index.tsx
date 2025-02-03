import * as React from 'react';
import { useMemo, useState } from 'react';
import { MUIContextMenu } from '../context';
import { Menu } from '../ui/Menu';
import { MenuItemProps } from '../types';

type MUIContextMenuProviderProps = {};

export const withMUIContextMenuProvider = (
  Component: (props: any) => React.ReactNode,
) =>
  function MUIContextMenuProvider(props: MUIContextMenuProviderProps) {
    const [items, setItems] = useState<MenuItemProps[]>([]);
    const [menuAnchorEl, setMenuAnchorRef] = useState<HTMLElement | null>(null);

    const contextApi = useMemo(
      () => ({
        setItems,
        setMenuAnchorRef,
        menuAnchorEl,
      }),
      [],
    );

    return (
      <MUIContextMenu.Provider value={contextApi}>
        <Component {...props} />
        <Menu
          items={items}
          parentIndex={0}
          menuAnchorEl={menuAnchorEl}
          onClose={() => setMenuAnchorRef(null)}
        />
      </MUIContextMenu.Provider>
    );
  };

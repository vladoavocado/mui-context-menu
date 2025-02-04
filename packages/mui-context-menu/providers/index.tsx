import * as React from 'react';
import { useMemo, useRef, useState } from 'react';
import { MUIContextMenu } from '../context';
import { Menu } from '../ui/Menu';
import { MenuItemProps, ShrunkMenuProps } from '../types';
import { useClickOutside } from '../hooks';

type MUIContextMenuProviderProps = {};

export const withMUIContextMenuProvider = (
  Component: (props: any) => React.ReactNode,
) =>
  function MUIContextMenuProvider(props: MUIContextMenuProviderProps) {
    const [items, setItems] = useState<MenuItemProps[]>([]);
    const [menuAnchorEl, setMenuAnchorRef] = useState<HTMLElement | null>(null);
    const [menuProps, setMenuProps] = useState<ShrunkMenuProps | null>(null);
    const submenuRefs = useRef<HTMLElement[]>([]);

    const contextApi = useMemo(
      () => ({
        setItems,
        setMenuAnchorRef,
        setMenuProps,
        menuAnchorEl,
      }),
      [],
    );

    useClickOutside(submenuRefs?.current, () => setMenuAnchorRef(null));

    return (
      <MUIContextMenu.Provider value={contextApi}>
        <Component {...props} />
        <Menu
          items={items}
          parentIndex='0'
          menuAnchorEl={menuAnchorEl}
          menuProps={menuProps}
          onClose={() => setMenuAnchorRef(null)}
          onAddRef={(ref: HTMLElement) => {
            if (!submenuRefs.current.includes(ref)) {
              submenuRefs.current.push(ref);
            }
          }}
        />
      </MUIContextMenu.Provider>
    );
  };

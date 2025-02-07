import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ContextMenuOptions, ContextMenuContext } from '../context';
import { Menu } from '../ui/Menu';
import { MenuItemProps, ShrunkMenuProps, BaseMenuItemProps } from '../types';
import { useClickOutside } from '../hooks';

type MUIContextMenuProviderProps = {};

export const withMUIContextMenuProvider = (
  Component: (props: any) => JSX.Element | null,
) =>
  function MUIContextMenuProvider(props: MUIContextMenuProviderProps) {
    const [items, setItems] = useState<MenuItemProps[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuProps, setMenuProps] = useState<ShrunkMenuProps | null>(null);
    const [itemProps, setItemProps] = useState<BaseMenuItemProps | null>(null);
    const [disableOutsideClick, setDisableOutsideClick] =
      useState<boolean>(false);
    const submenuRefs = useRef<HTMLElement[]>([]);

    const openMenu = useCallback((options: ContextMenuOptions) => {
      const {
        anchor,
        items: customItems,
        menuProps: customMenuProps,
        itemProps: customItemProps,
        closeOnOutsideClick,
      } = options;
      setAnchorEl(anchor);
      setItems(customItems);
      setMenuProps(customMenuProps ?? null);
      setItemProps(customItemProps ?? null);
      setDisableOutsideClick(closeOnOutsideClick ?? false);
    }, []);

    const closeMenu = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const disableCloseOnOutsideClick = useCallback((isDisabled: boolean) => {
      setDisableOutsideClick(isDisabled);
    }, []);

    const contextApi = useMemo(
      () => ({
        closeMenu,
        openMenu,
        disableCloseOnOutsideClick,
        isOpen: Boolean(anchorEl),
      }),
      [],
    );

    useClickOutside(
      submenuRefs?.current,
      disableOutsideClick ? () => {} : closeMenu,
    );

    return (
      <ContextMenuContext.Provider value={contextApi}>
        <Component {...props} />
        <Menu
          items={items}
          parentIndex='0'
          menuAnchorEl={anchorEl}
          menuProps={menuProps}
          menuItemProps={itemProps}
          onClose={closeMenu}
          onAddRef={(ref: HTMLElement) => {
            if (!submenuRefs.current.includes(ref)) {
              submenuRefs.current.push(ref);
            }
          }}
        />
      </ContextMenuContext.Provider>
    );
  };

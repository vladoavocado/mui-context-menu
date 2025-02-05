import { BaseMenuItemProps, MenuAnchorRef, MenuItemProps, ShrunkMenuProps } from '../types';
export declare type MUIContextMenuHookProps = {
    items: MenuItemProps[];
    anchorRef: MenuAnchorRef;
    menuProps?: ShrunkMenuProps;
    menuItemProps?: BaseMenuItemProps;
};
export declare const useMUIContextMenu: ({ items, anchorRef, menuProps, menuItemProps, }: MUIContextMenuHookProps) => {
    show(): void;
    hide(): void;
};

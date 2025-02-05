import { MenuAnchorRef, MenuItemProps, ShrunkMenuProps } from '../types';
export declare type MUIContextMenuHookProps = {
    items: MenuItemProps[];
    anchorRef: MenuAnchorRef;
    menuProps?: ShrunkMenuProps;
};
export declare const useMUIContextMenu: ({ items, anchorRef, menuProps, }: MUIContextMenuHookProps) => {
    show(): void;
    hide(): void;
};

/// <reference types="react" />
import { MenuAnchorRef, BaseMenuItemProps, MenuItemProps, ShrunkMenuProps } from '../types';
export declare type MUIContextMenuProps = {
    setItems(items: MenuItemProps[]): void;
    setMenuAnchorRef(ref: MenuAnchorRef): void;
    setMenuProps(props: ShrunkMenuProps): void;
    setMenuItemProps(props: BaseMenuItemProps | null): void;
    menuAnchorEl: HTMLElement | null;
};
export declare const MUIContextMenu: import("react").Context<MUIContextMenuProps>;

/// <reference types="react" />
import { MenuAnchorRef, MenuItemProps, ShrunkMenuProps } from '../types';
export declare type MUIContextMenuProps = {
    setItems(items: MenuItemProps[]): void;
    setMenuAnchorRef(ref: MenuAnchorRef): void;
    setMenuProps(props: ShrunkMenuProps): void;
    menuAnchorEl: HTMLElement | null;
};
export declare const MUIContextMenu: import("react").Context<MUIContextMenuProps>;

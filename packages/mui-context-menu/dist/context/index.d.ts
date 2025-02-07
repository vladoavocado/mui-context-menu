/// <reference types="react" />
import type { MenuItemProps, ShrunkMenuProps, BaseMenuItemProps } from '../types';
export interface ContextMenuOptions {
    items: MenuItemProps[];
    anchor: HTMLElement | null;
    menuProps?: ShrunkMenuProps;
    itemProps?: BaseMenuItemProps;
    closeOnOutsideClick?: boolean;
}
export interface ContextMenuContextValue {
    disableCloseOnOutsideClick: (isDisabled: boolean) => void;
    openMenu: (options: ContextMenuOptions) => void;
    closeMenu: () => void;
    isOpen: boolean;
}
export declare const ContextMenuContext: import("react").Context<ContextMenuContextValue>;

import * as React from 'react';
import { SxProps } from '@mui/material';
import { MenuItemProps, ShrunkMenuProps } from '../../types';
declare type MenuProps = {
    items: MenuItemProps[];
    parentIndex: string;
    menuAnchorEl?: HTMLElement | null;
    menuProps?: ShrunkMenuProps | null;
    onAddRef?: (ref: HTMLElement) => void;
    onClose?: () => void;
    sx?: SxProps;
};
export declare function Menu({ items, onClose, onAddRef, menuProps, menuAnchorEl, parentIndex, sx, }: MenuProps): React.JSX.Element;
export {};

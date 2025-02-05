import { ReactNode } from 'react';
import { TypographyProps, MenuProps as BaseMenuProps } from '@mui/material';
export declare type MenuItemProps = {
    text: string | ReactNode;
    textProps?: TypographyProps;
    highlight?: boolean;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    children?: MenuItemProps[];
};
export declare type ShrunkMenuProps = Pick<BaseMenuProps, 'anchorOrigin' | 'transformOrigin'>;
export declare type MenuAnchorRef = HTMLElement | null;

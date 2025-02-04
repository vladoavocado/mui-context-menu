import { ReactNode } from 'react';
import { TypographyProps, MenuProps as BaseMenuProps } from '@mui/material';

export type MenuItemProps = {
  text: string | ReactNode;
  textProps?: TypographyProps;
  highlight?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  children?: MenuItemProps[];
};

export type ShrunkMenuProps = Pick<
  BaseMenuProps,
  'anchorOrigin' | 'transformOrigin'
>;

export type MenuAnchorRef = HTMLElement | null;

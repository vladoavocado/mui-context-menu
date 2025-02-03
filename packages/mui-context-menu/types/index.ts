import { ReactNode } from 'react';

export type MenuItemProps = {
  text: string | ReactNode;
  children?: MenuItemProps[];
};

export type MenuAnchorRef = HTMLElement | null;

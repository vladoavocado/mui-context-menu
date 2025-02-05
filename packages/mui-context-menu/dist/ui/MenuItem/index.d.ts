import * as React from 'react';
import { MouseEventHandler, ReactNode } from 'react';
import { BaseMenuItemProps } from '../../types';
declare type MenuItemProps = {
    onMouseEnter: MouseEventHandler<HTMLElement>;
    onMouseLeave: MouseEventHandler<HTMLElement>;
    isHighlighted?: boolean;
    isTextComponent?: boolean;
    highlight?: boolean;
    children?: ReactNode;
} & BaseMenuItemProps;
export declare function MenuItem({ onMouseEnter, onMouseLeave, isHighlighted, isTextComponent, highlight, children, ...props }: MenuItemProps): React.JSX.Element;
export {};

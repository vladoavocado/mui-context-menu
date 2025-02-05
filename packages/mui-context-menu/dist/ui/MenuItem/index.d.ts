import * as React from 'react';
import { MouseEventHandler, ReactNode } from 'react';
declare type MenuItemProps = {
    onMouseEnter: MouseEventHandler<HTMLElement>;
    onMouseLeave: MouseEventHandler<HTMLElement>;
    isHighlighted?: boolean;
    isTextComponent?: boolean;
    highlight?: boolean;
    children?: ReactNode;
};
export declare function MenuItem({ onMouseEnter, onMouseLeave, isHighlighted, isTextComponent, highlight, children, }: MenuItemProps): React.JSX.Element;
export {};

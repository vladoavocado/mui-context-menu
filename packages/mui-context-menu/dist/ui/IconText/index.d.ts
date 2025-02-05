import * as React from 'react';
import { ReactNode } from 'react';
import { TypographyProps } from '@mui/material';
declare type IconTextProps = {
    text: ReactNode;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    hasChildren?: boolean;
    textProps?: TypographyProps;
};
export declare function IconText({ text, startAdornment, endAdornment, hasChildren, textProps, }: IconTextProps): React.JSX.Element;
export {};

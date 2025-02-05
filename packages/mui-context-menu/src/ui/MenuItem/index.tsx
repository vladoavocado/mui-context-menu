import * as React from 'react';
import { MouseEventHandler, ReactNode } from 'react';
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
import { BaseMenuItemProps } from '../../types';

type MenuItemProps = {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  isHighlighted?: boolean;
  isTextComponent?: boolean;
  highlight?: boolean;
  children?: ReactNode;
} & BaseMenuItemProps;

export function MenuItem({
  onMouseEnter,
  onMouseLeave,
  isHighlighted,
  isTextComponent,
  highlight = true,
  children,
  ...props
}: MenuItemProps) {

  return (
    <Box
      {...props}
      sx={[({ palette }) => ({
        px: 2,
        py: 1,
        width: '100%',
        pointerEvents: 'all',
        backgroundColor:
          isHighlighted && highlight
            ? alpha(palette.primary.light, 0.2)
            : 'transparent',

        '&:hover': {
          backgroundColor:
            isTextComponent || highlight
              ? alpha(palette.primary.light, 0.2)
              : 'transparent',
          cursor: 'default',
        },
      }), ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Box>
  );
}

// event => openMenu(id, event)

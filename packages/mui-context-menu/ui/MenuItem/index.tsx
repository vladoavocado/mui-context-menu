import * as React from 'react';
import { MouseEventHandler, ReactNode } from 'react';
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/material';

type MenuItemProps = {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  isHighlighted?: boolean;
  isTextComponent?: boolean;
  highlight?: boolean;
  children?: ReactNode;
};

export function MenuItem({
  onMouseEnter,
  onMouseLeave,
  isHighlighted,
  isTextComponent,
  highlight = true,
  children,
}: MenuItemProps) {
  return (
    <Box
      sx={({ palette }) => ({
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
      })}
      onClick={event => event.preventDefault()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Box>
  );
}

// event => openMenu(id, event)

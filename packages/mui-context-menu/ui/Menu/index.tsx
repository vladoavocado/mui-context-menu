import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { MenuItem, Menu as BaseMenu, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItemProps } from '../../types';

type MenuProps = {
  items: MenuItemProps[];
  parentIndex: number;
  menuAnchorEl?: HTMLElement | null;
  onClose(): void;
};

export function Menu({ items, menuAnchorEl, parentIndex }: MenuProps) {
  const [anchorItemRef, setAnchorItemRef] = useState<HTMLElement | null>(null);
  // const [trackedItemsAnchors] = useState<HTMLElement[]>([]);
  const onLocalClose = useCallback(() => {
    setAnchorItemRef(null);
  }, []);

  useEffect(() => {
    const onClose = (event: MouseEvent) => {
      // Do nothing if the target is not connected element with document
      if (!event.target) {
        return;
      }

      const isOutsideMenu = !menuAnchorEl?.contains(event.target as Node);

      if (isOutsideMenu) {
        setAnchorItemRef(null);
      }
    };

    document.addEventListener('click', onClose);

    return () => {
      document.removeEventListener('click', onClose);
    };
  }, []);

  return (
    <BaseMenu
      open={Boolean(menuAnchorEl)}
      anchorEl={menuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ padding: '1em' }}
    >
      {items.map(({ text, children }, index) => (
        <MenuItem
          key={`${parentIndex ? `${parentIndex}-` : ''}${index}`}
          sx={{
            width: '100%',
          }}
          // selected={hoveredField === fieldName}
          onMouseEnter={event => {
            // Open submenu
            setAnchorItemRef(event.currentTarget);
          }}
          onMouseLeave={() => {
            // Close submenu or a menu
            setAnchorItemRef(null);
          }}
        >
          {typeof text === 'string' ? (
            <Stack
              flexDirection='row'
              gap={2}
              justifyContent='space-between'
              sx={{ width: '100%' }}
            >
              <Typography>{text}</Typography>
              <ChevronRightIcon />
            </Stack>
          ) : (
            text
          )}
          {children && (
            <Menu
              items={children}
              menuAnchorEl={anchorItemRef}
              parentIndex={index}
              onClose={onLocalClose}
            />
          )}
        </MenuItem>
      ))}
    </BaseMenu>
  );
}

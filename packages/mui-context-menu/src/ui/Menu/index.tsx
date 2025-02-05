import * as React from 'react';
import { useRef, useState, MouseEvent, MouseEventHandler } from 'react';
import { Menu as BaseMenu, SxProps } from '@mui/material';
import { BaseMenuItemProps, MenuItemProps, ShrunkMenuProps } from '../../types';
import { IconText } from '../IconText';
import { MenuItem } from '../MenuItem';

type MenuProps = {
  items: MenuItemProps[];
  parentIndex: string;
  menuAnchorEl?: HTMLElement | null;
  menuProps?: ShrunkMenuProps | null;
  menuItemProps?: BaseMenuItemProps | null;
  onAddRef?: (ref: HTMLElement) => void;
  onClose?: () => void;
  sx?: SxProps;
};

export function Menu({
  items,
  onClose,
  onAddRef,
  menuProps,
  menuAnchorEl,
  menuItemProps,
  parentIndex,
  sx,
}: MenuProps) {
  const [openSubmenus, setOpenSubmenus] = useState<
    Record<string, HTMLElement | null>
  >({});

  const anchorTimeouts = useRef<Record<string, NodeJS.Timeout | null>>({});

  const closeMenu = (id: string) => {
    anchorTimeouts.current[id] = setTimeout(() => {
      setOpenSubmenus(prevState => ({
        ...prevState,
        [id]: null,
      }));

      anchorTimeouts.current[id] = null;
    }, 600);
  };

  const openMenu = (id: string, event: MouseEvent<HTMLElement>) => {
    if (anchorTimeouts.current[id]) {
      clearTimeout(anchorTimeouts.current[id]!);
      anchorTimeouts.current[id] = null;
    }

    setOpenSubmenus({
      [id]: event!.currentTarget,
    });
  };

  return (
    <BaseMenu
      ref={ref => {
        if (ref) {
          onAddRef?.(ref);
        }
      }}
      open={Boolean(menuAnchorEl)}
      anchorEl={menuAnchorEl}
      anchorOrigin={
        menuProps?.anchorOrigin ?? {
          vertical: 'top',
          horizontal: 'left',
        }
      }
      transformOrigin={
        menuProps?.transformOrigin ?? {
          vertical: 'top',
          horizontal: 'right',
        }
      }
      sx={{
        padding: '1em',
        pointerEvents: 'none',

        '& .MuiList-root': {
          p: 0,
        },
        ...sx,
      }}
      disableAutoFocus
      disableEnforceFocus
      onMouseLeave={() => {
        if (!openSubmenus[parentIndex]) {
          onClose?.();
        }
      }}
    >
      {items.map(
        (
          {
            text,
            children,
            textProps,
            highlight,
            startAdornment,
            endAdornment,
          },
          index,
        ) => {
          const id = `${parentIndex}-${index}`;
          const onMouseEnter: MouseEventHandler<HTMLElement> = (event) => openMenu(id, event);
          const onMouseLeave: MouseEventHandler<HTMLElement> = () => {
            if (openSubmenus[id] && children) {
              closeMenu(id);
            }
          };

          return (
            <MenuItem
              {...menuItemProps}
              key={id}
              highlight={highlight}
              isHighlighted={Boolean(openSubmenus[id] && items.length > 1)}
              isTextComponent={typeof text === 'string'}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <IconText
                text={text}
                hasChildren={(children?.length ?? 0) >= 1}
                textProps={textProps}
                startAdornment={startAdornment}
                endAdornment={endAdornment}
              />
              {children && (
                <Menu
                  items={children}
                  menuAnchorEl={openSubmenus[id]}
                  parentIndex={id}
                  onAddRef={onAddRef}
                  sx={{
                    pointerEvents: 'none',

                    '& .MuiMenuItem-root': {
                      pointerEvents: 'auto',
                    },
                  }}
                />
              )}
            </MenuItem>
          );
        },
      )}
    </BaseMenu>
  );
}

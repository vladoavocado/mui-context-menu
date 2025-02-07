import * as React from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useMUIContextMenu, useMuiContextMenuSettings } from '@vladoavocado/mui-context-menu';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

type FormContextProps = {
  onClick?: () => void;
}

function FormContext({ onClick }: FormContextProps) {
  const [value, setValue] = useState('female');
  const { disableCloseOnOutsideClick } = useMuiContextMenuSettings();

  useEffect(() => {
    disableCloseOnOutsideClick(value === 'female')
  }, [value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <FormControl onClick={event => event.stopPropagation()}>
      <FormLabel id='demo-controlled-radio-buttons-group'>Gender</FormLabel>
      <RadioGroup
        aria-labelledby='demo-controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='male' control={<Radio />} label='Male' />
      </RadioGroup>
      <Button onClick={onClick}>Close me</Button>
    </FormControl>
  );
}

export function ContextButton() {
  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const { openMenu, closeMenu } = useMUIContextMenu({
    items: useMemo(
      () => [
        {
          text: 'Settings',
        },
        { text: <Typography fontWeight='bold'>B</Typography> },
        {
          text: 'View',
          children: [
            {
              text: 'Appearance',
              children: [
                {
                  text: <FormContext onClick={() => closeMenu()} />,
                  highlight: false,
                },
              ],
            },
            { text: 'Notifications', children: [{ text: 'Email Alerts' }] },
            {
              text: 'Advanced',
              children: [
                {
                  text: 'Diagrams',
                },
              ],
            },
          ],
        },
      ],
      [],
    ),
    menuItemProps: {
      sx: {
        minWidth: '15em',
      }
    },
    anchorRef: buttonAnchorEl,
  });

  return (
    <Button
      variant='contained'
      ref={ref => {
        setButtonAnchorEl(ref);
      }}
      onClick={() => {
        openMenu();
      }}
    >
      Options
    </Button>
  );
}

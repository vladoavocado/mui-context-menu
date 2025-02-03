import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { useMUIContextMenu } from '@vladoavocado/mui-context-menu';
import { useMemo, useState } from 'react';

export function ContextButton() {
  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const { show } = useMUIContextMenu({
    items: useMemo(
      () => [
        {
          text: 'A',
        },
        { text: <Typography fontWeight='bold'>B</Typography> },
        {
          text: 'C',
          children: [{ text: 'D' }, { text: 'E' }, { text: 'F' }],
        },
      ],
      [],
    ),
    anchorRef: buttonAnchorEl,
  });

  return (
    <Button
      ref={ref => {
        setButtonAnchorEl(ref);
      }}
      onClick={() => {
        show();
      }}
    >
      Open
    </Button>
  );
}

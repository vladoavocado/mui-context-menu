import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { ContextButton } from 'app/components/ContextButton';

export function Content() {
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title='Data filters' />
      <CardContent>
        Right click on the element to open a context menu.
        <ContextButton />
      </CardContent>
    </Card>
  );
}

import * as React from 'react';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { ContextButton } from 'app/components/ContextButton';

export function Content() {
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title='System Management' />
      <CardContent>
        <Stack gap={2}>
          Use the menu to change settings
          <ContextButton />
        </Stack>
      </CardContent>
    </Card>
  );
}

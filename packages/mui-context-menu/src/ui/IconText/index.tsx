import * as React from 'react';
import { ReactNode } from 'react';
import { Stack, Typography, TypographyProps } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type IconTextProps = {
  text: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  hasChildren?: boolean;
  textProps?: TypographyProps;
};

export function IconText({
  text,
  startAdornment,
  endAdornment,
  hasChildren,
  textProps,
}: IconTextProps) {
  if (typeof text !== 'string') {
    return <>{text}</>;
  }

  return (
    <Stack
      flexDirection='row'
      gap={2}
      justifyContent='space-between'
      sx={{ width: '100%' }}
    >
      <Stack gap={1} alignItems='center' flexDirection='row'>
        {startAdornment}
        <Typography {...textProps}>{text}</Typography>
        {endAdornment}
      </Stack>
      {hasChildren && <ChevronRightIcon />}
    </Stack>
  );
}

import * as React from 'react';
import { Box, Grid2 as Grid } from '@mui/material';

type LayoutProps = {} & {
  children?: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={({ palette }) => ({
        background: palette.background.layout,
        minHeight: '100vh',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 5,
      })}
    >
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );
}

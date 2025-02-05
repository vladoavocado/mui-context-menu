import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    layout: string;
  }

  interface Palette {
    background: TypeBackground;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}

export const theme = createTheme({
  palette: {
    background: {
      layout: '#E7ECEF',
    },
  },
});

import type { ThemeOptions } from '@mui/material';

export const DataDisplayComponentsConfig: ThemeOptions = {
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
};

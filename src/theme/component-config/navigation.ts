import type { ThemeOptions } from '@mui/material';

export const NavigationComponentsConfig: ThemeOptions = {
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
};

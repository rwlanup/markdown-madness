import type { ThemeOptions } from '@mui/material';

export const DataDisplayComponentsConfig: ThemeOptions = {
  components: {
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          fontSize: (theme) => theme.typography.body2.fontSize,
          fontWeight: 'Medium',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: 'inherit',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          paddingLeft: '12px',
          paddingRight: '12px',
        },
      },
    },
  },
};

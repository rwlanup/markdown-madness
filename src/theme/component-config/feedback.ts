import type { ThemeOptions } from '@mui/material';

export const FeedbackComponentsConfig: ThemeOptions = {
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
};

import type { ThemeOptions } from '@mui/material';

export const LayoutComponentsConfig: ThemeOptions = {
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
};

import type { ThemeOptions } from '@mui/material';
import { Inter } from 'next/font/google';
export const font = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  display: 'swap',
});

export const TypographyConfig: ThemeOptions = {
  typography: {
    fontFamily: font.style.fontFamily,
    button: {
      textTransform: 'none',
    },
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },
};

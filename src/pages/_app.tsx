import type { AppProps as _AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import AppSnackbarProvider from '@/components/theme/snackbar-provider';
import { EmotionCache, CacheProvider } from '@emotion/react';
import createEmotionCache from '@/theme/emotion-cache';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface AppProps extends _AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppSnackbarProvider />
        <div style={{ minHeight: '100vh' }}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

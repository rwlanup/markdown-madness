import type { AppProps as _AppProps } from 'next/app';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import theme from '@/theme';
import AppSnackbarProvider from '@/components/theme/snackbar-provider';
import { EmotionCache, CacheProvider } from '@emotion/react';
import createEmotionCache from '@/theme/emotion-cache';
import Head from 'next/head';
import Header from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';
import StatusSidebar from '@/components/layouts/status-sidebar';

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
          <Header />
          <Toolbar />
          <Box sx={{ pl: '240px', pr: { xs: '240px', sm: '360px' } }}>
            <Component {...pageProps} />
          </Box>
          <StatusSidebar />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

import './global.css';
import type { AppProps as _AppProps } from 'next/app';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import theme from '@/theme';
import AppSnackbarProvider from '@/components/theme/snackbar-provider';
import { EmotionCache, CacheProvider } from '@emotion/react';
import createEmotionCache from '@/theme/emotion-cache';
import Head from 'next/head';
import Header from '@/components/layouts/header';
import StatusSidebar from '@/components/layouts/status-sidebar';
import AuthRedirect from '@/components/auth/auth-redirect';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ClaimChallengeButton from '@/components/challenge/claim-challenge-button';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface AppProps extends _AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>
      <QueryClientProvider client={queryClient}>
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
              <Box
                sx={{
                  pl: { md: '280px' },
                  pr: { lg: '360px' },
                  minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
                  bgcolor: 'grey.100',
                  position: 'relative',
                  pb: 5,
                }}
              >
                <ClaimChallengeButton />
                <AuthRedirect
                  requireAuth={'auth' in Component && typeof Component.auth === 'boolean' ? Component.auth : undefined}
                >
                  <Component {...pageProps} />
                </AuthRedirect>
              </Box>
              <StatusSidebar />
            </div>
          </ThemeProvider>
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}

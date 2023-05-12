import useAuthUser from '@/hooks/useAuthUser';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AuthRedirect({
  children,
  requireAuth,
}: {
  children: React.ReactNode;
  requireAuth: boolean | undefined;
}) {
  const { isLoading, sessionStatus } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth) {
      if (sessionStatus !== 'authenticated' && !isLoading) {
        router.replace('/login');
      }
    } else if (sessionStatus === 'authenticated' && requireAuth !== undefined) {
      router.replace('/');
    }
  }, [isLoading, router, sessionStatus, requireAuth]);

  if (isLoading) {
    return (
      <Box component="main" sx={{ py: 3, textAlign: 'center' }}>
        <CircularProgress disableShrink size={80} />
      </Box>
    );
  }
  return <>{children}</>;
}

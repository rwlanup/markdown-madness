import { getAuthFromStorage } from '@/helper/storage';
import useAppSelector from '@/hooks/useAppSelector';
import { useLoginMutation } from '@/store/services/auth';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const userInfo = getAuthFromStorage();
  const user = useAppSelector((state) => state.auth.user);
  const [_, { isLoading }] = useLoginMutation({
    fixedCacheKey: 'AUTH_LOGIN',
  });
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      if (!userInfo) {
        router.replace('/login');
      }
    }
  }, [user, isLoading, router, userInfo]);

  if (isLoading || !user) {
    return (
      <Box component="main" sx={{ py: 3, textAlign: 'center' }}>
        <CircularProgress disableShrink size={80} />
      </Box>
    );
  }
  return <>{children}</>;
}

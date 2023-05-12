import useAuthUser from '@/hooks/useAuthUser';
import { contributorsCollectionRef } from '@firebase/collections';
import { Box, CircularProgress } from '@mui/material';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function AuthSubscriber({ user }: { user: Session['user'] }) {
  useFirestoreDocument(['auth', user.username], doc(contributorsCollectionRef, user.username), { subscribe: true });
  return null;
}

export default function AuthRedirect({
  children,
  requireAuth,
}: {
  children: React.ReactNode;
  requireAuth: boolean | undefined;
}) {
  const { isFetching, sessionStatus, sessionUser } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth) {
      if (sessionStatus !== 'authenticated' && !isFetching) {
        router.replace('/login');
      }
    } else if (sessionStatus === 'authenticated' && requireAuth !== undefined) {
      router.replace('/');
    }
  }, [isFetching, router, sessionStatus, requireAuth]);
  if (isFetching) {
    return (
      <Box component="main" sx={{ py: 3, textAlign: 'center' }}>
        <CircularProgress disableShrink size={80} />
      </Box>
    );
  }
  return (
    <>
      {sessionStatus === 'authenticated' && !!sessionUser && <AuthSubscriber user={sessionUser} />}
      {children}
    </>
  );
}

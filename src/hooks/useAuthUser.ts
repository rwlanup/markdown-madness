import { Contributor } from '@/types/contributor';
import { contributorsCollectionRef } from '@firebase/collections';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { DocumentSnapshot, FirestoreError, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import type { QueryKey, UseQueryOptions } from 'react-query';

export default function useAuthUser(
  options?:
    | Omit<
        UseQueryOptions<DocumentSnapshot<Contributor>, FirestoreError, DocumentSnapshot<Contributor>, QueryKey>,
        'queryFn'
      >
    | undefined
) {
  const session = useSession();
  const { remove, ...auth } = useFirestoreDocument(
    ['auth', session.data?.user.username],
    session.status === 'authenticated' ? doc(contributorsCollectionRef, session.data?.user.username) : undefined,
    undefined,
    { ...options, enabled: session.status === 'authenticated' }
  );

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      remove();
    }
  }, [session.status, remove]);
  return {
    ...auth,
    remove,
    isLoading: session.status === 'loading' || auth.isLoading,
    sessionUser: session.data?.user,
    sessionStatus: session.status,
  };
}

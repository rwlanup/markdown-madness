import { Challenge } from '@/types/challenge';
import { challengesCollectionRef } from '@firebase/collections';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { limit, orderBy, query } from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';

const challengeQuery = query<Challenge>(challengesCollectionRef, orderBy('createdAt', 'desc'), limit(1));
export default function useChallengeQuery() {
  const query = useFirestoreQuery<Challenge>(
    'challenges',
    challengeQuery,
    {
      subscribe: true,
    },
    {
      onError(err) {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    }
  );

  const challengeDoc = query.data?.docs.length ? query.data.docs[0].data() : undefined;
  return {
    ...query,
    challengeDoc,
  };
}

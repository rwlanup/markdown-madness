import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import useChallengeQuery, { challengeQuery } from './useChallengeQuery';
import { getDocs } from 'firebase/firestore';
import { ChallengeType } from '@/types/challenge';

export default function useClaimChallengePoints() {
  const { data: userSnap } = useAuthUser();
  let { data: challengeSnap, challengeDoc } = useChallengeQuery();
  const mutation = useFirestoreTransaction(
    firestore,
    async (tsx) => {
      if (!userSnap?.exists()) {
        throw new Error('Please log in to claim challenge points');
      }

      if (!challengeSnap) {
        challengeSnap = await getDocs(challengeQuery);
      }

      if (!challengeSnap || challengeSnap.size === 0) {
        throw new Error('On ongoing challenge is found');
      }

      const challengeDoc = challengeSnap.docs[0];
      if (!challengeDoc.exists()) {
        throw new Error('On ongoing challenge is found');
      }
      const challengeData = challengeDoc.data();
      if (challengeData.winner) {
        throw new Error('Challenge points already has a winner');
      }

      const userData = userSnap.data();

      const hasCompletedAllChallengeTasks =
        Object.keys(challengeData.tasks).every((task) => {
          return userData.challengeScore[task as ChallengeType] >= challengeData.tasks[task as ChallengeType]!;
        }) && challengeDoc.id === userData.challengeScore.challengeId;

      if (!hasCompletedAllChallengeTasks) {
        throw new Error('Please complete all tasks of challenge before claiming points');
      }
      tsx.update(challengeDoc.ref, {
        'winner.avatarUrl': userData.avatarUrl,
        'winner.username': userSnap.id,
      });

      tsx.update(userSnap.ref, {
        challengeScore: {
          challengeId: null,
          PROTECT: 0,
          ROB: 0,
          SCORE: 0,
        },
        score: challengeData.worthScore + userData.score,
      });
    },
    {
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
      onSuccess() {
        enqueueSnackbar(`Congrats, you won the challenge and received ${challengeDoc?.worthScore} points`, {
          variant: 'success',
        });
      },
    }
  );

  return mutation;
}

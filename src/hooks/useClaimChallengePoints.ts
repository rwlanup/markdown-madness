import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import useChallengeQuery, { challengeQuery } from './useChallengeQuery';
import { getDocs } from 'firebase/firestore';
import { ChallengeType } from '@/types/challenge';

export default function useClaimChallengePoints() {
  const { data: userSnap } = useAuthUser();
  let { data: challengeSnap } = useChallengeQuery();
  const mutation = useFirestoreTransaction(firestore, async (tsx) => {
    if (!userSnap?.exists()) {
      enqueueSnackbar('Please log in to claim challenge points', { variant: 'error' });
      return;
    }

    if (!challengeSnap) {
      challengeSnap = await getDocs(challengeQuery);
    }

    if (!challengeSnap || challengeSnap.size === 0) {
      enqueueSnackbar('On ongoing challenge is found', { variant: 'error' });
      return;
    }

    const challengeDoc = challengeSnap.docs[0];
    if (!challengeDoc.exists()) {
      enqueueSnackbar('On ongoing challenge is found', { variant: 'error' });
      return;
    }
    const challengeData = challengeDoc.data();
    if (challengeData.winner) {
      enqueueSnackbar('Challenge points already has a winner', { variant: 'error' });
      return;
    }

    const userData = userSnap.data();

    const hasCompletedAllChallengeTasks =
      Object.keys(challengeData.tasks).every((task) => {
        return userData.challengeScore[task as ChallengeType] >= challengeData.tasks[task as ChallengeType]!;
      }) && challengeDoc.id === userData.challengeScore.challengeId;

    if (!hasCompletedAllChallengeTasks) {
      enqueueSnackbar('Please complete all tasks of challenge before claiming points', { variant: 'error' });
      return;
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

    enqueueSnackbar(`Congrats, you won the challenge and received ${challengeData.worthScore} points`, {
      variant: 'success',
    });
  });

  return mutation;
}

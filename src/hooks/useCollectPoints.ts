import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc, getDocs } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import useChallengeQuery, { challengeQuery } from './useChallengeQuery';

export default function useCollectPoints(contentId: string) {
  const { data: userSnap } = useAuthUser();
  let { data: challengeSnap } = useChallengeQuery();
  const mutation = useFirestoreTransaction(
    firestore,
    async (tsx) => {
      if (!userSnap?.exists()) {
        throw new Error('Please login to collect points');
      }
      const userData = userSnap.data();
      const contentSnap = await tsx.get(doc(contentsCollectionRef, contentId));

      if (!contentSnap.exists()) return;
      const contentData = contentSnap.data();

      if (userSnap.id !== contentData.contributor.username) {
        throw new Error("You cannot collect points of other's points. Please collect points from your own contents.");
      }

      if (contentData.score === 0) {
        throw new Error('This content does not have any points to collect');
      }

      if (!challengeSnap) {
        challengeSnap = await getDocs(challengeQuery);
      }

      const newUserScore = userData.score + contentData.score;

      if (challengeSnap && challengeSnap.size > 0) {
        const challengeDocSnap = challengeSnap.docs[0];
        if (challengeDocSnap.id === userData.challengeScore.challengeId) {
          tsx.update(userSnap.ref, {
            score: newUserScore,
            'challengeScore.SCORE': userData.challengeScore.SCORE + contentData.score,
          });
        } else {
          tsx.update(userSnap.ref, {
            score: newUserScore,
            challengeScore: {
              challengeId: challengeDocSnap.id,
              ROB: 0,
              PROTECT: 0,
              SCORE: contentData.score,
            },
          });
        }
      } else {
        tsx.update(userSnap.ref, {
          score: newUserScore,
        });
      }

      tsx.update(contentSnap.ref, {
        score: 0,
      });

      return true;
    },
    {
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
      onSuccess() {
        enqueueSnackbar(`You have collected points successfully`, { variant: 'success' });
      },
    }
  );

  return mutation;
}

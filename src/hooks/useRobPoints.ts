import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc, getDocs } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import useChallengeQuery, { challengeQuery } from './useChallengeQuery';

export default function useRobPoints(contentId: string) {
  const { data: userSnap } = useAuthUser();
  let { data: challengeSnap } = useChallengeQuery();
  const mutation = useFirestoreTransaction(
    firestore,
    async (tsx) => {
      if (!userSnap?.exists()) {
        throw new Error('Please login to rob points');
      }

      const userData = userSnap.data();
      if (userData.thiefCount <= 0) {
        throw new Error('You do not have any thief to rob points. Buy thief from store');
      }

      const contentSnap = await tsx.get(doc(contentsCollectionRef, contentId));

      if (!contentSnap.exists()) return;
      const contentData = contentSnap.data();

      if (userSnap.id === contentData.contributor.username) {
        throw new Error('You cannot rob points from own contents. Please rob points from others contents.');
      }

      if (contentData.score === 0) {
        throw new Error('This content does not have any points to rob');
      }

      const isRobSuccessful = userData.thiefCount > contentData.policeCount;
      if (!challengeSnap && isRobSuccessful) {
        challengeSnap = await getDocs(challengeQuery);
      }

      tsx.update(contentSnap.ref, {
        score: isRobSuccessful ? 0 : contentData.score + 5 * userData.thiefCount,
        policeCount: contentData.policeCount + Math.round(Math.random() * userData.thiefCount),
      });

      const newUserScore = userData.score + (isRobSuccessful ? contentData.score : 0);
      const newThiefCount = isRobSuccessful ? userData.thiefCount : 0;
      if (challengeSnap && challengeSnap.size > 0) {
        const challengeDocSnap = challengeSnap.docs[0];
        if (challengeDocSnap.id === userData.challengeScore.challengeId) {
          tsx.update(userSnap.ref, {
            score: newUserScore,
            thiefCount: newThiefCount,
            'challengeScore.ROB': userData.challengeScore.ROB + (isRobSuccessful ? 1 : 0),
            'challengeScore.SCORE': userData.challengeScore.SCORE + (isRobSuccessful ? contentData.score : 0),
          });
        } else {
          tsx.update(userSnap.ref, {
            thiefCount: newThiefCount,
            score: newUserScore,
            challengeScore: {
              challengeId: challengeDocSnap.id,
              ROB: isRobSuccessful ? 1 : 0,
              PROTECT: 0,
              SCORE: isRobSuccessful ? contentData.score : 0,
            },
          });
        }
      } else {
        tsx.update(userSnap.ref, {
          thiefCount: newThiefCount,
          score: newUserScore,
        });
      }

      return isRobSuccessful;
    },
    {
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
      onSuccess(isRobSuccessful) {
        if (isRobSuccessful) {
          enqueueSnackbar(`You robbed points successfully`, { variant: 'success' });
        } else {
          enqueueSnackbar('Your thieves got caught by police. You lost all your thieves.');
        }
      },
    }
  );

  return mutation;
}

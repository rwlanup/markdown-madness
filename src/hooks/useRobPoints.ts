import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';

export default function useRobPoints(contentId: string) {
  const { data: userSnap } = useAuthUser();
  const mutation = useFirestoreTransaction(firestore, async (tsx) => {
    if (!userSnap?.exists()) {
      enqueueSnackbar('Please login to rob points');
      return;
    }

    const userData = userSnap.data();
    if (userData.thiefCount <= 0) {
      enqueueSnackbar('You do not have any thief to rob points. Buy thief from store', { variant: 'error' });
      return;
    }

    const contentSnap = await tsx.get(doc(contentsCollectionRef, contentId));

    if (!contentSnap.exists()) return;
    const contentData = contentSnap.data();

    if (userSnap.id === contentData.contributor.username) {
      enqueueSnackbar('You cannot rob points from own contents. Please rob points from others contents.', {
        variant: 'error',
      });
      return;
    }

    if (contentData.score === 0) {
      enqueueSnackbar('This content does not have any points to rob');
      return;
    }

    const isRobSuccessful = userData.thiefCount > contentData.policeCount;

    tsx.update(contentSnap.ref, {
      score: isRobSuccessful ? 0 : contentData.score + 5 * userData.thiefCount,
      policeCount: contentData.policeCount + Math.round(Math.random() * userData.thiefCount),
    });

    tsx.update(userSnap.ref, {
      score: userData.score + (isRobSuccessful ? contentData.score : 0),
      thiefCount: isRobSuccessful ? userData.thiefCount : 0,
      'challengeScore.ROB': userData.challengeScore.ROB + (isRobSuccessful ? 1 : 0),
    });

    if (isRobSuccessful) {
      enqueueSnackbar(`You robbed ${contentData.score} points`, { variant: 'success' });
      return true;
    } else {
      enqueueSnackbar('Your thieves got caught by police. You lost all your thieves.');
    }
  });

  return mutation;
}

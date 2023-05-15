import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';

export default function useAddPoliceman(contentId: string, policeCount: number) {
  const { data: userSnap } = useAuthUser();
  const mutation = useFirestoreTransaction(firestore, async (tsx) => {
    if (!userSnap?.exists()) {
      enqueueSnackbar('Please login to rob points');
      return;
    }

    const userData = userSnap.data();
    if (userData.policeCount <= 0) {
      enqueueSnackbar('You do not have any policeman to add. Buy policeman from store', { variant: 'error' });
      return;
    }

    if (userData.policeCount < policeCount) {
      enqueueSnackbar(`You do not have ${policeCount} policeman to add. Buy policeman from store`, {
        variant: 'error',
      });
      return;
    }

    const contentSnap = await tsx.get(doc(contentsCollectionRef, contentId));

    if (!contentSnap.exists()) return;
    const contentData = contentSnap.data();

    if (userSnap.id !== contentData.contributor.username) {
      enqueueSnackbar('You cannot add policeman to others contents.', {
        variant: 'error',
      });
      return;
    }

    tsx.update(contentSnap.ref, {
      policeCount: contentData.policeCount + policeCount,
    });

    tsx.update(userSnap.ref, {
      policeCount: Math.max(userData.policeCount - policeCount, 0),
      'challengeScore.PROTECT': userData.challengeScore.PROTECT + 1,
    });

    enqueueSnackbar('You have added policeman successfull');
    return true;
  });

  return mutation;
}

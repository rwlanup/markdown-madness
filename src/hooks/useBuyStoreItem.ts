import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import { doc } from 'firebase/firestore';
import { storeCollectionRef } from '@firebase/collections';

export default function useBuyStoreItem(itemId: string) {
  const { data: userSnap } = useAuthUser();

  const mutation = useFirestoreTransaction(
    firestore,
    async (tsx) => {
      if (!userSnap?.exists()) {
        throw new Error('Please login to buy item from store');
      }

      const storeItemSnap = await tsx.get(doc(storeCollectionRef, itemId));
      if (!storeItemSnap.exists()) return;

      const userData = userSnap.data();
      const storeItemData = storeItemSnap.data();
      if (userData.score < storeItemData.points) {
        throw new Error('You do not have enough points to buy the item');
      }

      tsx.update(userSnap.ref, {
        policeCount: userData.policeCount + storeItemData.policeCount,
        thiefCount: userData.thiefCount + storeItemData.thiefCount,
        score: userData.score - storeItemData.points,
      });
    },
    {
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
      onSuccess() {
        enqueueSnackbar('You have successfully bought item from store', { variant: 'success' });
      },
    }
  );

  return mutation;
}

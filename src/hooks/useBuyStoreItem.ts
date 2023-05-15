import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import { doc } from 'firebase/firestore';
import { storeCollectionRef } from '@firebase/collections';

export default function useBuyStoreItem(itemId: string) {
  const { data: userSnap } = useAuthUser();

  const mutation = useFirestoreTransaction(firestore, async (tsx) => {
    if (!userSnap?.exists()) {
      enqueueSnackbar('Please login to buy item from store');
      return;
    }

    const storeItemSnap = await tsx.get(doc(storeCollectionRef, itemId));
    if (!storeItemSnap.exists()) return;

    const userData = userSnap.data();
    const storeItemData = storeItemSnap.data();
    if (userData.score < storeItemData.points) {
      enqueueSnackbar('You do not have enough points to buy the item', { variant: 'error' });
      return;
    }

    tsx.update(userSnap.ref, {
      policeCount: userData.policeCount + storeItemData.policeCount,
      thiefCount: userData.thiefCount + storeItemData.thiefCount,
      score: userData.score - storeItemData.points,
    });

    enqueueSnackbar(`You have successfully bought store item worth ${storeItemData.points}`, { variant: 'success' });
  });

  return mutation;
}

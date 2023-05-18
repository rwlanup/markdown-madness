import { REACTION } from '@/types/other';
import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';

export default function useDislike(id: string) {
  const { data: userSnap } = useAuthUser();
  const mutation = useFirestoreTransaction(
    firestore,
    async (tsx) => {
      if (!userSnap?.exists()) {
        throw new Error('Please login to add reaction');
      }

      const userData = userSnap.data();
      const contentSnap = await tsx.get(doc(contentsCollectionRef, id));

      if (!contentSnap.exists()) return;
      const contentData = contentSnap.data();

      const prevReaction = userData.reactedPosts[id] ?? null;
      const wasDisliked = prevReaction === 'DISLIKES';
      const wasLiked = prevReaction === 'LIKES';
      const scoreMod = wasLiked ? -10 : wasDisliked ? 5 : -5;
      tsx.update(contentSnap.ref, {
        'reactionCount.DISLIKES': contentData.reactionCount.DISLIKES + (wasDisliked ? -1 : 1),
        'reactionCount.LIKES': contentData.reactionCount.LIKES + (wasLiked ? -1 : 0),
        score: Math.max(contentData.score + scoreMod, 0),
      });

      tsx.update(userSnap.ref, {
        [`reactedPosts.${id}`]: wasDisliked ? null : ('DISLIKES' as REACTION),
      });
    },
    {
      onError(err) {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    }
  );

  return mutation;
}

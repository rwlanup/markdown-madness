import { REACTION } from '@/types/other';
import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';

export default function useLike(id: string) {
  const { data: userSnap } = useAuthUser();

  const mutation = useFirestoreTransaction(firestore, async (tsx) => {
    if (!userSnap?.exists()) {
      enqueueSnackbar('Please login to add reaction');
      return;
    }
    const userData = userSnap.data();
    const contentSnap = await tsx.get(doc(contentsCollectionRef, id));

    if (!contentSnap.exists()) return;
    const contentData = contentSnap.data();

    const prevReaction = userData.reactedPosts[id] ?? null;
    const wasDisliked = prevReaction === 'DISLIKES';
    const wasLiked = prevReaction === 'LIKES';
    const scoreMod = wasDisliked ? 10 : wasLiked ? -5 : 5;
    tsx.update(contentSnap.ref, {
      'reactionCount.DISLIKES': contentData.reactionCount.DISLIKES - (wasDisliked ? 1 : 0),
      'reactionCount.LIKES': contentData.reactionCount.LIKES + (wasLiked ? -1 : 1),
      score: Math.max(contentData.score + scoreMod),
    });

    tsx.update(userSnap.ref, {
      [`reactedPosts.${id}`]: wasLiked ? null : ('LIKES' as REACTION),
    });
  });

  return mutation;
}

import { REACTION } from '@/types/other';
import { contentsCollectionRef, contributorsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';

export default function useDislike(id: string) {
  const { data: userSnap } = useAuthUser();
  const userData = userSnap?.data();
  const mutation = useFirestoreTransaction(firestore, async (tsx) => {
    if (!userSnap?.exists()) {
      enqueueSnackbar('Please login to add reaction');
      return;
    }

    const contentSnap = await tsx.get(doc(contentsCollectionRef, id));

    if (!contentSnap.exists()) return;
    const contentData = contentSnap.data();
    const contributorSnap = await tsx.get(doc(contributorsCollectionRef, contentData.contributor.username));

    let prevReaction: REACTION | null = null;
    if (userData) {
      prevReaction = userData.reactedPosts[id];
    }
    const wasDisliked = prevReaction === 'DISLIKES';
    const wasLiked = prevReaction === 'LIKES';
    const scoreMod = wasLiked ? -10 : wasDisliked ? 5 : -5;
    tsx.update(contentSnap.ref, {
      'reactionCount.DISLIKES': contentData.reactionCount.DISLIKES + (wasDisliked ? -1 : 1),
      'reactionCount.LIKES': contentData.reactionCount.LIKES + (wasLiked ? -1 : 0),
      score: contentData.score + scoreMod,
    });

    if (contributorSnap.exists()) {
      const contributorData = contributorSnap.data();
      tsx.update(contributorSnap.ref, {
        score: contributorData.score + scoreMod,
        'challengeScore.POST_SCORE': contributorData.score + scoreMod,
        'challengeScore.SCORE': contributorData.challengeScore.SCORE + scoreMod,
      });
    }

    if (userSnap) {
      tsx.update(userSnap.ref, {
        [`reactedPosts.${id}`]: wasDisliked ? null : ('DISLIKES' as REACTION),
      });
    }
  });

  return mutation;
}

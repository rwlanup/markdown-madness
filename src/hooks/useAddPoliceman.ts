import { contentsCollectionRef } from '@firebase/collections';
import { useFirestoreTransaction } from '@react-query-firebase/firestore';
import { doc, getDocs } from 'firebase/firestore';
import useAuthUser from './useAuthUser';
import { firestore } from '@firebase/index';
import { enqueueSnackbar } from 'notistack';
import useChallengeQuery, { challengeQuery } from './useChallengeQuery';

export default function useAddPoliceman(contentId: string, policeCount: number) {
  const { data: userSnap } = useAuthUser();
  let { data: challengeSnap } = useChallengeQuery();
  const mutation = useFirestoreTransaction(
    firestore,
    async (tsx) => {
      if (!userSnap?.exists()) {
        throw new Error('Please login to rob points');
      }

      const userData = userSnap.data();
      if (userData.policeCount <= 0) {
        throw new Error('You do not have any policeman to add. Buy policeman from store');
      }

      if (userData.policeCount < policeCount) {
        throw new Error(`You do not have ${policeCount} policeman to add. Buy policeman from store`);
      }

      const contentSnap = await tsx.get(doc(contentsCollectionRef, contentId));

      if (!contentSnap.exists()) return;
      const contentData = contentSnap.data();

      if (userSnap.id !== contentData.contributor.username) {
        throw new Error('You cannot add policeman to others contents.');
      }

      if (!challengeSnap) {
        challengeSnap = await getDocs(challengeQuery);
      }

      tsx.update(contentSnap.ref, {
        policeCount: contentData.policeCount + policeCount,
      });

      const newUserPoliceCount = Math.max(userData.policeCount - policeCount, 0);

      if (challengeSnap && challengeSnap.size > 0) {
        const challengeDocSnap = challengeSnap.docs[0];
        if (challengeDocSnap.id === userData.challengeScore.challengeId) {
          tsx.update(userSnap.ref, {
            policeCount: newUserPoliceCount,
            'challengeScore.PROTECT': userData.challengeScore.PROTECT + policeCount,
          });
        } else {
          tsx.update(userSnap.ref, {
            policeCount: newUserPoliceCount,
            challengeScore: {
              challengeId: challengeDocSnap.id,
              ROB: 0,
              PROTECT: policeCount,
              SCORE: 0,
            },
          });
        }
      } else {
        tsx.update(userSnap.ref, {
          policeCount: newUserPoliceCount,
        });
      }
      return true;
    },
    {
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
      onSuccess() {
        enqueueSnackbar('You have added policeman successfully', { variant: 'success' });
      },
    }
  );

  return mutation;
}

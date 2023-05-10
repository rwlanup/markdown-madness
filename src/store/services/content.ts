import {
  DocumentSnapshot,
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { api } from '../api';
import { MadnessContent } from '@/types/madness';
import { formatDateTime } from '@/helper/datetime';
import { firestore } from '@firebase/index';

const markdownContentsRef = collection(firestore, 'markdownContents');
export const MADNESS_CONTENTS_LIMIT = 20;

let lastDocSnap: DocumentSnapshot | null = null;

export const markdownContentApi = api.injectEndpoints({
  endpoints: (build) => ({
    contentsList: build.query<{ contents: MadnessContent[]; canLoadMore: boolean }, void>({
      query: () => ({
        async fn() {
          const contentsSnap = await getDocs(
            query(
              markdownContentsRef,
              orderBy('createdAt', 'desc'),
              startAfter(lastDocSnap ?? []),
              limit(MADNESS_CONTENTS_LIMIT)
            )
          );
          const contents: MadnessContent[] = [];
          contentsSnap.forEach((content) => {
            contents.push({
              id: content.id,
              ...content.data(),
              createdAt: formatDateTime((content.data().createdAt as Timestamp).toDate()),
            } as MadnessContent);
          });

          const canLoadMore = contents.length === MADNESS_CONTENTS_LIMIT;
          if (canLoadMore) {
            lastDocSnap = contentsSnap.docs[contentsSnap.docs.length - 1];
          } else {
            lastDocSnap = null;
          }
          return {
            contents,
            canLoadMore,
          };
        },
      }),
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        console.log(responseData.contents);
        currentCacheData.contents.push(...responseData.contents);
        currentCacheData.canLoadMore = responseData.canLoadMore;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useContentsListQuery } = markdownContentApi;
